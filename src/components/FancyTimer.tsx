"use client";
import {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import useCountDown from "@/hooks/useCountDown";

export interface FanyTimerType {
  reset: (n: number) => void;
}

interface Props {
  textsize: string;
}

const FancyTimer = forwardRef<FanyTimerType, Props>((props, ref) => {
  const [seconds, isTimeOver, reset] = useCountDown(0, 1000);
  const [color, setColor] = useState<string>("text-primary");

  useImperativeHandle(ref, () => ({
    reset,
  }));

  useEffect(() => {
    if (seconds > 120) {
      setColor("text.primary");
    } else if (seconds > 60) {
      setColor("text-warning");
    } else {
      setColor("text-error");
    }
  }, [seconds]);

  return (
    <span className={`countdown ${props.textsize} ${color}`}>
      <span
        style={
          {
            "--value": dayjs.duration(seconds, "s").format("mm"),
          } as CSSProperties
        }
      ></span>
      :
      <span
        style={
          {
            "--value": dayjs.duration(seconds, "s").format("ss"),
          } as CSSProperties
        }
      ></span>
    </span>
  );
});

export default FancyTimer;
