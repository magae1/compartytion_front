import React, { ReactNode, Suspense } from "react";
import Link from "next/link";

import AccountMenu from "@/components/AccountMenu";

export default function Layout({ children }: { children: ReactNode }) {
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
            <Suspense
              fallback={
                <div
                  className={"skeleton h-11 w-11 shrink-0 rounded-full"}
                ></div>
              }
            >
              <AccountMenu />
            </Suspense>
          </div>
        </nav>
      </div>
      {children}
    </>
  );
}
