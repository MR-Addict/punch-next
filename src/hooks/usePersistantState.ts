import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function usePersistantState<T>(
  key: string,
  defaultValue: T,
  prefix = "persistant-state"
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const value = localStorage.getItem(`${prefix}-${key}`);
    if (typeof value === "string") return JSON.parse(value);
    return defaultValue;
  });

  useEffect(() => {
    const callback = () => localStorage.setItem(`${prefix}-${key}`, JSON.stringify(state));
    const timer = setTimeout(callback, 500);
    return () => clearTimeout(timer);
  }, [state, key]);

  return [state, setState];
}
