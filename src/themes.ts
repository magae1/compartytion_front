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
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.text.primary,
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        header: "rgba(252,252,252, 0.8)",
      },
    },
    dark: {
      palette: {
        header: "rgba(3,3,3, 0.8)",
      },
    },
  },
});
