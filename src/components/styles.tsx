"use client";
import { AppBar, styled } from "@mui/material";

export const DefaultAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  boxShadow: "none",
  backdropFilter: "blur(16px)",
  "& a": {
    textDecoration: "none",
  },
}));
