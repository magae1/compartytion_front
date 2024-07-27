import React, { ReactNode } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Box, Stack, Toolbar, Typography } from "@mui/material";

import { DefaultAppBar } from "@/components/styles";
import AccountDrawer from "@/components/AccountDrawer";
import { COOKIE_IS_AUTH } from "@/constants";

export default async function Layout({ children }: { children: ReactNode }) {
  const is_authenticated = cookies().get(COOKIE_IS_AUTH);
  if (!is_authenticated || is_authenticated.value !== "true") {
    redirect("/auth");
  }

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
