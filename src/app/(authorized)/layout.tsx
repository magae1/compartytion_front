import React, { ReactNode } from "react";
import Link from "next/link";
import { Box, Stack, Toolbar, Typography } from "@mui/material";

import { DefaultAppBar } from "@/components/styles";
import AccountDrawer from "@/components/AccountDrawer";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultAppBar>
        <Toolbar>
          <Link href={"/"} style={{ color: "inherit" }}>
            <Typography sx={{ fontWeight: 600 }}>Compartytion</Typography>
          </Link>
          <Stack direction={"column"}>
            <AccountDrawer />
          </Stack>
        </Toolbar>
      </DefaultAppBar>
      <Box component={"main"}>
        <Toolbar />
        {children}
      </Box>
    </>
  );
}
