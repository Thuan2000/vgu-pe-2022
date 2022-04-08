import { MotionProps } from "framer-motion";

export function fromoHeightAnimation(maxHeight: number | string): MotionProps {
  return {
    initial: { maxHeight: 0, overflowY: "hidden" },
    transition: { duration: 0.2 },
    animate: {
      maxHeight,
      overflowY: "auto",
    },
  };
}

export function fromoRotationAnimation(rotate: number | string): MotionProps {
  return {
    initial: { rotate: "0deg" },
    transition: { duration: 0.2 },
    animate: { rotate },
  };
}
