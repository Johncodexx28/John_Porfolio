import { describe, expect, it, vi } from "vitest";

import { createAnimationFrameLoop } from "./animationFrameLoop";

describe("createAnimationFrameLoop", () => {
  it("sleeps when a frame reports no more work and wakes without duplicating frames", () => {
    const callbacks = [];
    const requestFrame = vi.fn((callback) => {
      callbacks.push(callback);
      return callbacks.length;
    });
    const cancelFrame = vi.fn();
    const render = vi.fn(() => false);
    const loop = createAnimationFrameLoop({ render, requestFrame, cancelFrame });

    loop.wake();
    loop.wake();
    expect(requestFrame).toHaveBeenCalledTimes(1);

    callbacks.shift()(16);
    expect(render).toHaveBeenCalledTimes(1);
    expect(requestFrame).toHaveBeenCalledTimes(1);

    loop.wake();
    expect(requestFrame).toHaveBeenCalledTimes(2);
  });

  it("cancels pending work when paused", () => {
    const requestFrame = vi.fn(() => 42);
    const cancelFrame = vi.fn();
    const loop = createAnimationFrameLoop({
      render: () => true,
      requestFrame,
      cancelFrame,
    });

    loop.wake();
    loop.pause();

    expect(cancelFrame).toHaveBeenCalledWith(42);
  });
});
