import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useSessionState<T>(
  key: string,
  defaultValue: T,
  prefix = "session-state"
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const value = sessionStorage.getItem(`${prefix}-${key}`);
    if (typeof value === "string") return JSON.parse(value);
    return defaultValue;
  });

  useEffect(() => {
    const callback = () => sessionStorage.setItem(`${prefix}-${key}`, JSON.stringify(state));
    const timer = setTimeout(callback, 500);
    return () => clearTimeout(timer);
  }, [state, key]);

  return [state, setState];
}
