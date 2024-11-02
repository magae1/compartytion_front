import React, { ReactNode } from "react";
import Link from "next/link";

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
        </nav>
      </div>
      <main className={"h-full"}>
        <div
          className={"container pt-12 sm:pt-24 md:pt-36 flex justify-center"}
        >
          <div className={"w-full max-w-80"}>{children}</div>
        </div>
      </main>
    </>
  );
}
