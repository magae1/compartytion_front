import React, { ReactNode } from "react";
import Link from "next/link";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppBar sx={{ bgcolor: "background.default", borderWidth: "1px 0px" }}>
        <Container>
          <Toolbar disableGutters>
            <Link
              href={"/"}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography sx={{ fontWeight: 600 }}>Compartytion</Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component={"main"} maxWidth={"md"}>
        <Toolbar />
        <Box
          pt={{ xs: "12vh", sm: "16vh", md: "20vh" }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box width={"100%"} maxWidth={360}>
            {children}
          </Box>
        </Box>
      </Container>
    </>
  );
}
