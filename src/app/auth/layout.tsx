import React, { ReactNode } from "react";
import { Box, Container, Grid, Toolbar } from "@mui/material";

import SocialAuth from "@/app/auth/_components/SocialAuth";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth={"md"}>
      <Toolbar />
      <Box height={{ xs: "8vh", sm: "16vh", md: "24vh" }}></Box>
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
  );
}
