import { ReactNode } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import { authTheme } from "@/themes";
import SocialAuth from "@/components/SocialAuth";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <CssVarsProvider theme={authTheme}>
      <Box flexGrow={1}>
        <Box height={{ xs: "12vh", sm: "25vh" }}>
          <Typography variant={"h6"} textAlign={"center"}>
            Come Party with Competition
          </Typography>
        </Box>
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
