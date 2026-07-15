import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface UseTiltOptions {
  /** Maximum rotation in degrees applied on either axis. */
  maxTilt?: number;
  /** Subtle scale applied while the pointer is over the card. */
  hoverScale?: number;
  /** Spring stiffness/damping for the smoothing motion values. */
  spring?: { stiffness: number; damping: number };
}

interface UseTiltResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  /** Glare highlight position as a CSS percentage string, e.g. "80% 20%". */
  glarePosition: MotionValue<string>;
  /** Glare opacity, fades in on hover/focus and out on leave. */
  glareOpacity: MotionValue<number>;
  handlers: {
    onPointerMove: (e: React.PointerEvent<T>) => void;
    onPointerEnter: (e: React.PointerEvent<T>) => void;
    onPointerLeave: () => void;
  };
}

/**
 * Tracks pointer position within an element and derives a 3D tilt.
 *
 * The raw pointer position is normalized to a -0.5…0.5 range on both axes
 * (0,0 sits at the element's center), then mapped to a capped rotation so
 * the card appears to lean toward the cursor. A specular "glare" position
 * is derived from the same normalized coordinates. Everything is routed
 * through spring-smoothed motion values so the card eases back to flat
 * on pointer leave instead of snapping.
 */
export function useTilt<T extends HTMLElement>(
  options: UseTiltOptions = {},
): UseTiltResult<T> {
  const {
    maxTilt = 12,
    hoverScale = 1.03,
    spring = { stiffness: 300, damping: 30 },
  } = options;

  const ref = useRef<T>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  // Raw normalized pointer position, -0.5 (left/top edge) to 0.5 (right/bottom edge).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hoverAmount = useMotionValue(0);

  const springPx = useSpring(px, spring);
  const springPy = useSpring(py, spring);
  const springHover = useSpring(hoverAmount, spring);

  // Pointer toward the top (py -0.5) tilts the top edge toward the viewer,
  // pointer toward the left (px -0.5) tilts the left edge toward the viewer.
  const rotateX = useTransform(springPy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springPx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const scale = useTransform(springHover, [0, 1], [1, hoverScale]);

  const glarePosition = useTransform([springPx, springPy], (latest) => {
    const [x, y] = latest as [number, number];
    return `${(x + 0.5) * 100}% ${(y + 0.5) * 100}%`;
  });
  const glareOpacity = useTransform(springHover, [0, 1], [0, 0.5]);

  function updateFromPointer(e: React.PointerEvent<T>) {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return {
    ref,
    rotateX,
    rotateY,
    scale,
    glarePosition,
    glareOpacity,
    handlers: {
      onPointerMove: updateFromPointer,
      onPointerEnter: (e) => {
        hoverAmount.set(1);
        updateFromPointer(e);
      },
      onPointerLeave: () => {
        hoverAmount.set(0);
        px.set(0);
        py.set(0);
      },
    },
  };
}
