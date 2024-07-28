"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

import useCountDown from "@/hooks/useCountDown";

export interface FanyTimerType {
  reset: (n: number) => void;
}

const FancyTimer = forwardRef<FanyTimerType, TypographyProps>((props, ref) => {
  const [seconds, isTimeOver, reset] = useCountDown(0, 1000);
  const [color, setColor] = useState<string>("text.primary");

  useImperativeHandle(ref, () => ({
    reset,
  }));

  useEffect(() => {
    if (seconds > 120) {
      setColor("text.primary");
    } else if (seconds > 60) {
      setColor("warning.main");
    } else {
      setColor("error.main");
    }
  }, [seconds]);

  return (
    <Typography sx={{ color: color }} {...props}>
      {dayjs.duration(seconds, "s").format("mm:ss")}
    </Typography>
  );
});

export default FancyTimer;
