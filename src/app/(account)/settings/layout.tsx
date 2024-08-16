import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Box } from "@mui/material";

import { COOKIE_IS_AUTH } from "@/constants";

export default async function Layout({ children }: { children: ReactNode }) {
  const is_authenticated = cookies().get(COOKIE_IS_AUTH)?.value === "true";
  if (!is_authenticated) {
    redirect("/auth");
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}>
      {children}
    </Box>
  );
}
