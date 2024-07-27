import React, { ReactNode } from "react";
import Link from "next/link";
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";

import SocialAuth from "@/app/auth/_components/SocialAuth";
import { DefaultAppBar } from "@/components/styles";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultAppBar>
        <Toolbar sx={{ height: "64px" }}>
          <Container disableGutters>
            <Link href={"/"} style={{ color: "inherit" }}>
              <Typography sx={{ fontWeight: 600 }}>Compartytion</Typography>
            </Link>
          </Container>
        </Toolbar>
      </DefaultAppBar>
      <Box component={"main"}>
        <Toolbar sx={{ height: "64px" }} />
        <Box height={{ xs: "8vh", sm: "16vh", md: "24vh" }}></Box>
        <Container maxWidth={"md"}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SocialAuth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Box width={"100%"} maxWidth={320} pt={1}>
                  {children}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
