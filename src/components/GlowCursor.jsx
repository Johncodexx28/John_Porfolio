import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./GlowCursor.css";

const MAX_POINTS = 64;

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

#define MAX_POINTS 64

uniform vec2 uResolution;
uniform vec2 uPoints[MAX_POINTS];
uniform float uPointCount;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uTrailWidth;
uniform float uTaper;
uniform float uGlowIntensity;
uniform float uGlowSpread;
uniform float uHotspot;
uniform float uBrightness;
uniform float uOpacity;
uniform float uPulseSpeed;
uniform float uNoiseStrength;
uniform float uNormalBlend;
uniform float uTime;
uniform float uFade;

varying vec2 vUv;

float sRGB(float value) {
  if (value <= 0.00031308) return 12.92 * value;
  return 1.055 * pow(value, 1.0 / 2.4) - 0.055;
}

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
}

float filmGrain(vec2 point, float time) {
  float frame = time * 18.0;
  float frameIndex = mod(floor(frame), 256.0);
  float nextFrameIndex = mod(frameIndex + 1.0, 256.0);
  float blend = fract(frame);
  blend = blend * blend * (3.0 - 2.0 * blend);
  vec2 pixel = floor(point);
  float current = hash(pixel + vec2(frameIndex * 17.0, frameIndex * 31.0));
  float next = hash(pixel + vec2(nextFrameIndex * 17.0, nextFrameIndex * 31.0));
  return mix(current, next, blend) * 2.0 - 1.0;
}

void main() {
  vec2 pixel = vUv * uResolution;
  float denominator = max(uPointCount - 1.0, 1.0);
  float strongest = 0.0;
  float strongestCore = 0.0;
  float colorWeight = 0.0;
  vec3 colorSum = vec3(0.0);

  for (int i = 0; i < MAX_POINTS - 1; i++) {
    float index = float(i);
    float active = 1.0 - step(uPointCount - 1.0, index);
    vec2 start = uPoints[i];
    vec2 end = uPoints[i + 1];
    vec2 toPixel = pixel - start;
    vec2 segment = end - start;
    float along = clamp(dot(toPixel, segment) / max(dot(segment, segment), 0.0001), 0.0, 1.0);
    float progress = clamp((index + along) / denominator, 0.0, 1.0);
    float life = pow(max(1.0 - progress, 0.0), mix(0.55, 1.25, uTaper));
    float width = uTrailWidth * mix(1.0, 0.25, pow(progress, mix(0.55, 1.6, uTaper)));
    float distanceToTrail = length(toPixel - segment * along);
    float falloff = max(width * (0.8 + uGlowSpread * 1.4), 0.5);
    float beam = min(1.0, (falloff * falloff) / (distanceToTrail * distanceToTrail + falloff * falloff));
    float core = exp(-pow(distanceToTrail / max(width, 0.5), 2.0) * 2.5);
    float pulseAmount = min(abs(uPulseSpeed), 1.0);
    float pulse = 1.0 + sin(uTime * uPulseSpeed * 3.0 - progress * 11.0) * 0.16 * pulseAmount;
    float intensity = (core + beam * uGlowIntensity * 0.55) * life * pulse * active;
    vec3 segmentColor = mix(uColor, uSecondaryColor, progress);

    strongest = max(strongest, intensity);
    strongestCore = max(strongestCore, core * life * active);
    colorSum += segmentColor * intensity;
    colorWeight += intensity;
  }

  float grain = filmGrain(pixel, uTime);
  float noiseAmount = (1.0 - exp(-uNoiseStrength * 2.2)) * 0.4;
  float alpha = clamp(strongest * uOpacity * uFade, 0.0, 1.0);
  if (alpha < 0.0005) discard;

  vec3 color = colorSum / max(colorWeight, 0.0001);
  color = mix(color, vec3(1.0), smoothstep(0.25, 0.95, strongestCore) * uHotspot);
  float luminance = sRGB(clamp(strongest * uBrightness, 0.0, 1.0));
  luminance *= 1.0 + grain * noiseAmount;
  vec3 additiveColor = color * luminance;
  float normalAlpha = clamp(strongest * uBrightness * uOpacity * uFade, 0.0, 1.0);
  vec3 normalColor = mix(color, vec3(1.0), smoothstep(0.45, 1.0, strongestCore) * uHotspot * 0.35);
  gl_FragColor = vec4(mix(additiveColor, normalColor, uNormalBlend), mix(alpha, normalAlpha, uNormalBlend));
}
`;

const hexToRgb = (hex) => {
  let value = (hex || "").replace("#", "").trim();
  if (value.length === 3) {
    value = value
      .split("")
      .map((character) => character + character)
      .join("");
  }
  const parsed = Number.parseInt(value || "000000", 16);
  return [
    ((parsed >> 16) & 255) / 255,
    ((parsed >> 8) & 255) / 255,
    (parsed & 255) / 255,
  ];
};

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

const GlowCursor = ({
  color = "#67E8F9",
  secondaryColor = "#A78BFA",
  trailLength = 40,
  trailWidth = 8,
  trailTaper = 0.8,
  followSpeed = 0.16,
  glowIntensity = 1.9,
  glowSpread = 1.2,
  hotspot = 0.65,
  brightness = 1.25,
  opacity = 1,
  pulseSpeed = 1.1,
  noiseStrength = 0.035,
  idleFade = true,
  idleTimeout = 700,
  fadeDuration = 900,
  blendMode = "screen",
  maxDevicePixelRatio = 1.5,
  enabled = true,
  children,
  className = "",
  style,
  ...rest
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const propsRef = useRef({});

  propsRef.current = {
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleFade,
    idleTimeout,
    fadeDuration,
    maxDevicePixelRatio,
    blendMode,
    enabled,
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const initialConfig = propsRef.current;
    const renderer = new Renderer({
      canvas,
      alpha: true,
      dpr: Math.min(
        window.devicePixelRatio || 1,
        initialConfig.maxDevicePixelRatio
      ),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const pointData = Array(MAX_POINTS * 2).fill(0);
    const points = Array.from({ length: MAX_POINTS }, () => ({ x: 0, y: 0 }));
    const target = { x: 0, y: 0 };
    const head = { x: 0, y: 0 };
    const currentColor = hexToRgb(initialConfig.color);
    const currentSecondaryColor = hexToRgb(initialConfig.secondaryColor);
    let targetColor = [...currentColor];
    let targetSecondaryColor = [...currentSecondaryColor];
    let currentGlowIntensity = initialConfig.glowIntensity;
    let currentGlowSpread = initialConfig.glowSpread;
    let currentHotspot = initialConfig.hotspot;
    let currentBrightness = initialConfig.brightness;
    let currentOpacity = initialConfig.opacity;
    let currentNormalBlend = initialConfig.blendMode === "normal" ? 1 : 0;
    let targetGlowIntensity = currentGlowIntensity;
    let targetGlowSpread = currentGlowSpread;
    let targetHotspot = currentHotspot;
    let targetBrightness = currentBrightness;
    let targetOpacity = currentOpacity;
    let targetNormalBlend = currentNormalBlend;
    const program = new Program(gl, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uResolution: { value: [1, 1] },
        uPoints: { value: pointData },
        uPointCount: { value: initialConfig.trailLength },
        uColor: { value: hexToRgb(initialConfig.color) },
        uSecondaryColor: { value: hexToRgb(initialConfig.secondaryColor) },
        uTrailWidth: { value: initialConfig.trailWidth },
        uTaper: { value: initialConfig.trailTaper },
        uGlowIntensity: { value: initialConfig.glowIntensity },
        uGlowSpread: { value: initialConfig.glowSpread },
        uHotspot: { value: initialConfig.hotspot },
        uBrightness: { value: initialConfig.brightness },
        uOpacity: { value: initialConfig.opacity },
        uPulseSpeed: { value: initialConfig.pulseSpeed },
        uNoiseStrength: { value: initialConfig.noiseStrength },
        uNormalBlend: { value: initialConfig.blendMode === "normal" ? 1 : 0 },
        uTime: { value: 0 },
        uFade: { value: 0 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let width = 1;
    let height = 1;
    let initialized = false;
    let pointerInside = false;
    let fade = 0;
    let lastInputTime = performance.now();
    let lastFrameTime = performance.now();
    let animationFrame = 0;
    let destroyed = false;

    const resize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };

    const initializeTrail = (x, y) => {
      target.x = x;
      target.y = y;
      head.x = x;
      head.y = y;
      points.forEach((point) => {
        point.x = x;
        point.y = y;
      });
      initialized = true;
      fade = 1;
    };

    let pointerClientX = window.innerWidth / 2;
    let pointerClientY = window.innerHeight / 2;

    const updateTheme = () => {
      const themedSection = document
        .elementFromPoint(pointerClientX, pointerClientY)
        ?.closest("[data-glow-color]");
      targetColor = hexToRgb(
        themedSection?.dataset.glowColor || propsRef.current.color
      );
      targetSecondaryColor = hexToRgb(
        themedSection?.dataset.glowSecondaryColor ||
          themedSection?.dataset.glowColor ||
          propsRef.current.secondaryColor
      );
      targetGlowIntensity = Number(
        themedSection?.dataset.glowIntensity || propsRef.current.glowIntensity
      );
      targetGlowSpread = Number(
        themedSection?.dataset.glowSpread || propsRef.current.glowSpread
      );
      targetHotspot = Number(
        themedSection?.dataset.glowHotspot || propsRef.current.hotspot
      );
      targetBrightness = Number(
        themedSection?.dataset.glowBrightness || propsRef.current.brightness
      );
      targetOpacity = Number(
        themedSection?.dataset.glowOpacity || propsRef.current.opacity
      );
      targetNormalBlend =
        (themedSection?.dataset.glowBlend || propsRef.current.blendMode) ===
        "normal"
          ? 1
          : 0;
    };

    const updatePointer = (event) => {
      const rect = container.getBoundingClientRect();
      const x = clamp(event.clientX - rect.left, 0, rect.width);
      const y = clamp(rect.height - (event.clientY - rect.top), 0, rect.height);
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
      updateTheme();
      if (!initialized) initializeTrail(x, y);
      target.x = x;
      target.y = y;
      pointerInside = true;
      lastInputTime = performance.now();
    };

    const handlePointerLeave = () => {
      pointerInside = false;
      lastInputTime = performance.now();
    };

    const render = (now) => {
      if (destroyed) return;
      const config = propsRef.current;
      const delta = Math.min((now - lastFrameTime) / 16.667, 3);
      lastFrameTime = now;

      if (initialized) {
        const headEase =
          1 - Math.pow(1 - clamp(config.followSpeed, 0.01, 0.99), delta);
        const chainBase = clamp(0.28 + config.followSpeed * 0.35, 0.08, 0.92);
        const chainEase = 1 - Math.pow(1 - chainBase, delta);
        head.x += (target.x - head.x) * headEase;
        head.y += (target.y - head.y) * headEase;
        points[0].x = head.x;
        points[0].y = head.y;

        for (let index = 1; index < MAX_POINTS; index += 1) {
          points[index].x +=
            (points[index - 1].x - points[index].x) * chainEase;
          points[index].y +=
            (points[index - 1].y - points[index].y) * chainEase;
        }

        for (let index = 0; index < MAX_POINTS; index += 1) {
          pointData[index * 2] = points[index].x;
          pointData[index * 2 + 1] = points[index].y;
        }
      }

      const idleFor = now - lastInputTime;
      const shouldFade =
        config.idleFade && (!pointerInside || idleFor > config.idleTimeout);
      const fadeStep = (16.667 * delta) / Math.max(config.fadeDuration, 16);
      const fadeTarget = initialized && config.enabled && !shouldFade ? 1 : 0;
      fade += (fadeTarget - fade) * Math.min(1, fadeStep * 7);

      const colorEase = 1 - Math.pow(0.88, delta);
      for (let channel = 0; channel < 3; channel += 1) {
        currentColor[channel] +=
          (targetColor[channel] - currentColor[channel]) * colorEase;
        currentSecondaryColor[channel] +=
          (targetSecondaryColor[channel] - currentSecondaryColor[channel]) *
          colorEase;
      }
      currentGlowIntensity +=
        (targetGlowIntensity - currentGlowIntensity) * colorEase;
      currentGlowSpread += (targetGlowSpread - currentGlowSpread) * colorEase;
      currentHotspot += (targetHotspot - currentHotspot) * colorEase;
      currentBrightness += (targetBrightness - currentBrightness) * colorEase;
      currentOpacity += (targetOpacity - currentOpacity) * colorEase;
      currentNormalBlend +=
        (targetNormalBlend - currentNormalBlend) * colorEase;

      program.uniforms.uPointCount.value = clamp(
        Math.round(config.trailLength),
        2,
        MAX_POINTS
      );
      program.uniforms.uColor.value = currentColor;
      program.uniforms.uSecondaryColor.value = currentSecondaryColor;
      program.uniforms.uTrailWidth.value = Math.max(config.trailWidth, 0.1);
      program.uniforms.uTaper.value = clamp(config.trailTaper, 0, 1);
      program.uniforms.uGlowIntensity.value = Math.max(currentGlowIntensity, 0);
      program.uniforms.uGlowSpread.value = Math.max(currentGlowSpread, 0);
      program.uniforms.uHotspot.value = clamp(currentHotspot, 0, 1);
      program.uniforms.uBrightness.value = Math.max(currentBrightness, 0);
      program.uniforms.uOpacity.value = clamp(currentOpacity, 0, 1);
      program.uniforms.uPulseSpeed.value = config.pulseSpeed;
      program.uniforms.uNoiseStrength.value = clamp(config.noiseStrength, 0, 1);
      program.uniforms.uNormalBlend.value = currentNormalBlend;
      program.uniforms.uTime.value = now * 0.001;
      program.uniforms.uFade.value = fade;

      renderer.render({ scene: mesh });
      if (!destroyed) animationFrame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    container.addEventListener("pointermove", updatePointer);
    container.addEventListener("pointerenter", updatePointer);
    container.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", updateTheme, { passive: true });
    resize();
    animationFrame = requestAnimationFrame(render);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", updatePointer);
      container.removeEventListener("pointerenter", updatePointer);
      container.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", updateTheme);
      mesh.geometry.remove();
      program.remove();
    };
  }, [maxDevicePixelRatio]);

  return (
    <div
      ref={containerRef}
      className={`glow-cursor${className ? ` ${className}` : ""}`}
      style={style}
      {...rest}
    >
      <canvas
        ref={canvasRef}
        className="glow-cursor__canvas"
        style={{ mixBlendMode: blendMode }}
        aria-hidden="true"
      />
      {children ? <div className="glow-cursor__content">{children}</div> : null}
    </div>
  );
};

export default GlowCursor;
