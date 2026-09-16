import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./DriftWall.css";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export default function DriftWall({
  items,
  columns = 3,
  tileWidth = 160,
  tileHeight = 106,
  gap = 10,
  radius = 10,
  tilt = 12,
  turn = -10,
  roll = 0,
  perspective = 1000,
  depth = 54,
  speed = 16,
  direction = "up",
  variance = 0.35,
  parallax = 0.35,
  pauseOnHover = false,
  lift = 26,
  fade = 0.45,
  dim = 0.62,
  grayscale = false,
  overlayColor = "#090909",
}) {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);
  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColumnRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTimestampRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(340);
  const [activeId, setActiveId] = useState(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduced(event.matches);
    setReduced(prefersReducedMotion());
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 340);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const columnItems = useMemo(() => {
    const nextColumns = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => nextColumns[index % columns].push(item));
    return nextColumns.map((column) => (column.length ? column : items.slice(0, 1)));
  }, [columns, items]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((column) => {
      const copyHeight = Math.max(unit, column.length * unit);
      return { copyHeight, copies: Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1) };
    });
  }, [columnItems, containerHeight, gap, tileHeight]);

  const velocities = useMemo(() => {
    const directionSign = direction === "up" ? 1 : -1;
    return columnItems.map((_, index) => {
      const alternatingSign = index % 2 === 0 ? 1 : -1;
      return speed * columnFactor(index, variance) * directionSign * alternatingSign;
    });
  }, [columnItems, direction, speed, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, index) => meta.copyHeight * ((index * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnItems, columnMeta]);

  const applyPlaneTransform = useCallback(
    (x, y) => {
      if (!planeRef.current) return;
      planeRef.current.style.transform = `translate(-50%, -50%) scale(1.1) rotateX(${tilt + y}deg) rotateY(${turn + x}deg) rotateZ(${roll}deg) translateZ(${-depth}px)`;
    },
    [depth, roll, tilt, turn]
  );

  useEffect(() => {
    const animate = (timestamp) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
      const delta = Math.min(0.05, Math.max(0, timestamp - lastTimestampRef.current) / 1000);
      lastTimestampRef.current = timestamp;

      const damping = 1 - Math.exp(-delta / 0.12);
      const maxTilt = parallax * 8;
      pointerDampedRef.current.x += (pointerRef.current.x * maxTilt - pointerDampedRef.current.x) * damping;
      pointerDampedRef.current.y += (-pointerRef.current.y * maxTilt - pointerDampedRef.current.y) * damping;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      for (let index = 0; index < trackRefs.current.length; index += 1) {
        const meta = columnMeta[index];
        const track = trackRefs.current[index];
        if (!meta || !track) continue;
        if (!reduced) {
          const stopped = (wallHoveredRef.current && pauseOnHover) || hoveredColumnRef.current === index;
          const targetVelocity = velocities[index] * (stopped ? 0 : 1);
          velocitiesRef.current[index] += (targetVelocity - velocitiesRef.current[index]) * (1 - Math.exp(-delta / 0.2));
          offsetsRef.current[index] = ((offsetsRef.current[index] + velocitiesRef.current[index] * delta) % meta.copyHeight + meta.copyHeight) % meta.copyHeight;
        }
        track.style.transform = `translate3d(0, ${-(offsetsRef.current[index] || 0)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimestampRef.current = null;
    };
  }, [applyPlaneTransform, columnMeta, parallax, pauseOnHover, reduced, velocities]);

  const handlePointerMove = useCallback((event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    };
  }, []);

  const cssVariables = {
    "--dw-tile-w": `${tileWidth}px`,
    "--dw-tile-h": `${tileHeight}px`,
    "--dw-gap": `${gap}px`,
    "--dw-radius": `${radius}px`,
    "--dw-perspective": `${perspective}px`,
    "--dw-lift": `${lift}px`,
    "--dw-dim": dim,
    "--dw-gray": grayscale ? 1 : 0,
    "--dw-overlay": overlayColor,
    "--dw-fade": `${Math.max(0, Math.min(1, fade)) * 100}%`,
  };

  return (
    <div
      ref={containerRef}
      className="drift-wall"
      style={cssVariables}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => { wallHoveredRef.current = true; }}
      onPointerLeave={() => {
        wallHoveredRef.current = false;
        hoveredColumnRef.current = -1;
        pointerRef.current = { x: 0, y: 0 };
        setActiveId(null);
      }}
      role="group"
      aria-label="Work in motion"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((column, columnIndex) => {
          const copies = Array.from({ length: columnMeta[columnIndex].copies });
          return (
            <div className="drift-wall__column" key={`column-${columnIndex}`}>
              <div className="drift-wall__track" ref={(element) => { trackRefs.current[columnIndex] = element; }}>
                {copies.map((_, copyIndex) => column.map((item, itemIndex) => {
                  const id = `${columnIndex}-${copyIndex}-${itemIndex}`;
                  return (
                    <a
                      key={id}
                      className={`drift-wall__tile${activeId === id ? " is-active" : ""}`}
                      href={item.href || "#projects"}
                      aria-label={item.title}
                      onFocus={() => { hoveredColumnRef.current = columnIndex; setActiveId(id); }}
                      onBlur={() => { hoveredColumnRef.current = -1; setActiveId(null); }}
                      onPointerEnter={() => { hoveredColumnRef.current = columnIndex; setActiveId(id); }}
                    >
                      <span className="drift-wall__inner">
                        <img src={item.image} alt="" loading="lazy" decoding="async" draggable="false" />
                        <span className="drift-wall__overlay" aria-hidden="true" />
                      </span>
                    </a>
                  );
                }))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
