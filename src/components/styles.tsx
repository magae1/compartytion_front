"use client";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { AppBar, styled } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    header: string;
  }

  interface Palette {
    header: string;
  }
}

export const DefaultAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.vars.palette.header,
  color: theme.vars.palette.text.primary,
  boxShadow: `${theme.vars.palette.divider} 0px 1px 2px`,
  backdropFilter: "blur(16px)",
  "& a": {
    textDecoration: "none",
  },
  "& .MuiToolbar-root": {
    display: "flex",
    justifyContent: "space-between",
  },
}));
