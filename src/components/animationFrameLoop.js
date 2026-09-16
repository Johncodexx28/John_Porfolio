export function createAnimationFrameLoop({
  render,
  requestFrame = requestAnimationFrame,
  cancelFrame = cancelAnimationFrame,
}) {
  let frameId = null;

  const tick = (timestamp) => {
    frameId = null;
    if (render(timestamp) !== false) {
      frameId = requestFrame(tick);
    }
  };

  return {
    wake() {
      if (frameId === null) frameId = requestFrame(tick);
    },
    pause() {
      if (frameId !== null) cancelFrame(frameId);
      frameId = null;
    },
  };
}
