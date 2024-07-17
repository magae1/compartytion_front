"use client";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";

import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import _ from "underscore";

const CustomAppBar = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
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
    <AppBar
      sx={{
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255,255,255, 0.8)"
            : "rgba(0,0,0,0.8)",
        color: theme.palette.text.primary,
        boxShadow: borderOn
          ? `${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.2) " : " rgba(255,255,255,0.2)"} 0px 1px 2px`
          : "none",
        backdropFilter: "blur(16px)",
      }}
    >
      {children}
    </AppBar>
  );
};

export default function BorderLineOnScrollAppBar() {
  return (
    <CustomAppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant={"h6"}>Compartytion</Typography>
        <Stack direction={"row"}>
          <Button
            component={Link}
            variant={"outlined"}
            endIcon={<ArrowForward />}
            href={"auth"}
          >
            로그인
          </Button>
        </Stack>
      </Toolbar>
    </CustomAppBar>
  );
}
