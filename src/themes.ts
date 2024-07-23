"use client";
import { Gothic_A1 } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    header: string;
  }

  interface Palette {
    header: string;
  }
}

const gothicA1 = Gothic_A1({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const mainTheme = extendTheme({
  typography: {
    fontFamily: gothicA1.style.fontFamily,
  },
  colorSchemes: {
    light: {
      palette: {
        header: "rgba(255,255,255, 0.8)",
      },
    },
    dark: {
      palette: {
        header: "rgba(0,0,0, 0.8)",
      },
    },
  },
});
