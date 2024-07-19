"use client";

import { useCallback, useEffect, useState } from "react";

const useLocalStorage = (): [
  (k: string, v: string) => void,
  (k: string) => string | null,
] => {
  const [mounted, setMounted] = useState(false);

  const setItem = useCallback(
    (key: string, value: string) => {
      if (mounted) {
        try {
          localStorage.setItem(key, value);
        } catch (e) {
          console.error(e);
        }
      }
    },
    [mounted],
  );

  const getItem = useCallback(
    (key: string) => {
      if (mounted) {
        try {
          return localStorage.getItem(key);
        } catch (e) {
          console.error(e);
        }
      }
      return null;
    },
    [mounted],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return [setItem, getItem];
};

export default useLocalStorage;
