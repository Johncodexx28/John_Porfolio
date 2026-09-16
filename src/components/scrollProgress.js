export const getScrollProgress = (trackTop, stickyOffset, scrollSpan) =>
  Math.min(Math.max((stickyOffset - trackTop) / scrollSpan, 0), 1);

export const getTrackHeight = (stageHeight, scrollDistance, holdDistance) =>
  stageHeight * (1 + scrollDistance + holdDistance);

export const getEntryRevealProgress = (trackTop, viewportHeight) => {
  const revealDistance = viewportHeight * 0.65;
  return Math.min(Math.max((viewportHeight - trackTop) / revealDistance, 0), 1);
};
