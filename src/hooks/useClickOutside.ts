import { DependencyList, useEffect } from "react";

export function useClickOutside<T extends Element = HTMLDivElement>(
  handler: (event?: MouseEvent | TouchEvent) => void,
  refs: React.RefObject<T> | React.RefObject<T>[],
  deps?: DependencyList
) {
  useEffect(() => {
    const innerListener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!target || !target.isConnected) return;

      const refArray = Array.isArray(refs) ? refs : [refs];
      const isOutside = refArray.every((ref) => ref.current && !ref.current.contains(target));

      if (isOutside) handler(event);
    };

    const outerListener = () => handler();

    document.addEventListener("mousedown", innerListener);
    document.addEventListener("touchstart", innerListener);
    window.addEventListener("blur", outerListener);

    return () => {
      document.removeEventListener("mousedown", innerListener);
      document.removeEventListener("touchstart", innerListener);
      window.removeEventListener("blur", outerListener);
    };
  }, deps);
}
