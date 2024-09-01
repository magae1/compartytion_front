import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import AccountMenu from "@/components/AccountMenu";

export default async function Layout({ children }: { children: ReactNode }) {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;

  const res = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["profile"] },
  });

  if (!res.ok) {
    redirect("/auth");
  }
  const data = await res.json();

  return (
    <>
      <div className={"sticky-header"}>
        <nav className={"navbar"}>
          <div className={"flex-1"}>
            <Link href={"/"} className={"btn btn-ghost text-xl"}>
              Compartytion
            </Link>
          </div>
          <div className={"flex-none flex gap-x-2 sm:pr-1 md:pr-3"}>
            <AccountMenu profileData={data} />
          </div>
        </nav>
      </div>
      <main>{children}</main>
    </>
  );
}
