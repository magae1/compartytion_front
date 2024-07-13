"use client";
import { Nanum_Gothic } from "next/font/google";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const theme = extendTheme({
  typography: {
    fontFamily: nanumGothic.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: `${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.2) " : " rgba(255,255,255,0.2)"} 0px 1px 2px`,
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255,255,255, 0.8)"
              : "rgba(0,0,0,0.8)",
          color: theme.palette.text.primary,
          backdropFilter: "blur(16px)",
        }),
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "64px",
        },
      },
    },
  },
  colorSchemes: {
    light: {},
    dark: {},
  },
});

export default theme;
