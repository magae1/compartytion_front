"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const useCountDown = (
  duration: number,
  interval: number,
): [number, boolean, (t: number) => void] => {
  const [seconds, setSeconds] = useState<number>(duration);
  const [isTimeOver, setTimeOver] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const countDown = () => {
    setSeconds((p) => p - 1);
  };

  const reset = useCallback((t: number) => {
    setTimeOver(false);
    setSeconds(t);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    intervalRef.current = setInterval(countDown, interval);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(countDown, interval);

    return () => {
      intervalRef.current && clearTimeout(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setTimeOver(true);
      intervalRef.current && clearTimeout(intervalRef.current);
    }
    return () => {};
  }, [seconds]);

  return [seconds, isTimeOver, reset];
};

export default useCountDown;
