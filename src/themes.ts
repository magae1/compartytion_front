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
  colorSchemes: {
    light: {},
    dark: {},
  },
});

export const authTheme = extendTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
        disableAnimation: true,
        margin: "dense",
      },
    },
    MuiInputBase: {
      defaultProps: {
        inputProps: {
          style: {
            padding: "10px 7px",
            fontSize: "1rem",
          },
        },
      },
      styleOverrides: {
        root: ({ theme }) => ({
          marginTop: theme.spacing(1),
        }),
      },
    },
  },
});
