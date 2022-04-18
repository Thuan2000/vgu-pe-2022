import { MutableRefObject, useEffect, useState } from "react";

// Hook
export function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin?: string
): boolean {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [currentToUnobserve, setCurrentToUnobserve] = useState<any>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: rootMargin || "-" + ref.current.clientHeight + "px",
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
      setCurrentToUnobserve(ref.current);
    }
    return () => {
      if (!!currentToUnobserve) observer.unobserve(currentToUnobserve);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
}
