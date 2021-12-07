import { useEffect, useRef } from "react";

export function useOutsideClickRef(onOutsideClick: () => void) {
  const ref = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !(ref?.current as any)?.contains(event.target))
        onOutsideClick();
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return ref;
}
