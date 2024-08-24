import React, { ReactNode, Suspense } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Skeleton, Toolbar, Typography } from "@mui/material";

import HomeAppBar from "@/components/HomeAppBar";
import AppbarTools from "@/components/AppbarTools";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

export default async function Layout({ children }: { children: ReactNode }) {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;

  const data = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["profile"] },
  })
    .then((res) => res.json())
    .catch(() => undefined);

  return (
    <>
      <HomeAppBar>
        <Toolbar>
          <Link href={"/"} style={{ color: "inherit" }}>
            <Typography sx={{ fontWeight: 600 }}>Compartytion</Typography>
          </Link>
          <Suspense
            fallback={<Skeleton variant={"circular"} width={40} height={40} />}
          >
            <AppbarTools profileData={data} />
          </Suspense>
        </Toolbar>
      </HomeAppBar>
      <main>
        <Toolbar />
        {children}
      </main>
    </>
  );
}
