import { ReactNode } from "react";
import Link from "next/link";
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { authTheme } from "@/themes";
import SocialAuth from "@/components/SocialAuth";
import { DefaultAppBar } from "@/components/styles";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider theme={authTheme}>
      <DefaultAppBar>
        <Container maxWidth={"lg"}>
          <Toolbar>
            <Link href={"/"} style={{ color: "inherit" }}>
              <Box style={{ display: "flex" }}>
                <Home />
                <Typography sx={{ ml: 1, fontWeight: 700 }}>
                  Compartytion
                </Typography>
              </Box>
            </Link>
          </Toolbar>
        </Container>
      </DefaultAppBar>
      <Toolbar />
      <Box flexGrow={1}>
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
    </CssVarsProvider>
  );
}
