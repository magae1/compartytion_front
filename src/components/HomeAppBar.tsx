"use client";
import { ReactNode, useEffect, useState } from "react";
import _ from "underscore";

import { DefaultAppBar } from "@/components/styles";

interface Props {
  children: ReactNode;
}

export default function HomeAppBar({ children }: Props) {
  const [borderOn, setBorderOn] = useState<boolean>(false);

  useEffect(() => {
    const scrollYRecorder = _.debounce(() => {
      if (window.scrollY > 32) {
        setBorderOn(true);
      } else {
        setBorderOn(false);
      }
    }, 100);
    window.addEventListener("scroll", scrollYRecorder);
    return () => {
      window.removeEventListener("scroll", scrollYRecorder);
    };
  }, []);

  return (
    <DefaultAppBar
      sx={
        borderOn
          ? undefined
          : {
              boxShadow: "none",
              bgcolor: "background.default",
              backdropFilter: "none",
            }
      }
    >
      {children}
    </DefaultAppBar>
  );
}
