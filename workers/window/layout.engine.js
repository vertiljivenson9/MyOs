// workers/window/layout.engine.js

/**
 * Calcula layout para una ventana
 */
export function computeLayout(win, viewport) {
  const { width, height, isMobile } = viewport;

  // Mobile: una ventana a la vez
  if (isMobile || width < 768) {
    return {
      x: 0,
      y: 0,
      width,
      height
    };
  }

  // Maximizada
  if (win.maximized) {
    return {
      x: 0,
      y: 32,
      width,
      height: height - 32
    };
  }

  // Normal (cascada)
  const offset = (win.id % 10) * 24;

  const w = Math.min(800, width - offset);
  const h = Math.min(600, height - offset - 32);

  return {
    x: offset,
    y: offset + 32,
    width: w,
    height: h
  };
}
