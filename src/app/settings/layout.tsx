import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";

import { COOKIE_IS_AUTH } from "@/constants";

export default async function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const is_authenticated = cookies().get(COOKIE_IS_AUTH)?.value === "true";
  if (!is_authenticated) {
    redirect("/auth");
  }

  return (
    <Container
      maxWidth={"md"}
      sx={{
        ".MuiTypography-root": {
          textAlign: "start",
        },
      }}
    >
      {children}
      {modal}
    </Container>
  );
}
