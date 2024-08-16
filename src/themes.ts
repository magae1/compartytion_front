"use client";
import { Gothic_A1 } from "next/font/google";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    subhead: CSSProperties;
  }

  interface TypographyVariantsOptions {
    subhead?: CSSProperties;
  }

  interface PaletteOptions {
    header: string;
  }

  interface Palette {
    header: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subhead: true;
  }
}

const gothicA1 = Gothic_A1({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const mainTheme = extendTheme({
  typography: {
    fontFamily: gothicA1.style.fontFamily,
    subhead: {
      fontSize: "2rem",
      fontWeight: 400,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          subhead: "h3",
        },
      },
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            left: "-14px",
            top: "3px",
          },
          "& .MuiFormHelperText-root": {
            marginLeft: 0,
          },
        },
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        header: "rgba(252,252,252, 0.6)",
        background: {
          default: "#fff",
          paper: "#f9f9f9",
        },
      },
    },
    dark: {
      palette: {
        header: "rgba(3,3,3, 0.6)",
        background: {
          default: "#000",
          paper: "#0f0f0f",
        },
      },
    },
  },
});
