"use client";
import { Nanum_Gothic } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const mainTheme = extendTheme({
  typography: {
    fontFamily: nanumGothic.style.fontFamily,
  },
});
