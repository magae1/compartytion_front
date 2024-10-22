import React, { ReactNode, Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { MdMenu, MdArrowForward } from "react-icons/md";

import AccountMenu from "@/components/AccountMenu";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { SimpleProfileType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";
import TextCopyButton from "@/components/TextCopyButton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"drawer lg:drawer-open"}>
      <input
        id={"dashboard-drawer"}
        type={"checkbox"}
        className={"drawer-toggle"}
      />
      <div className={"drawer-content"}>
        <div className={"sticky-header"}>
          <nav className={"navbar"}>
            <div className={"flex-none lg:hidden"}>
              <label
                htmlFor={"dashboard-drawer"}
                className={"btn btn-ghost btn-square"}
              >
                <MdMenu size={24} />
              </label>
            </div>
            <div className={"flex-1"}></div>
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
        <main>{children}</main>
      </div>
      <div className={"drawer-side"}>
        <label
          htmlFor={"dashboard-drawer"}
          aria-label={"사이드바 닫기"}
          className={"drawer-overlay"}
        ></label>
        <div
          className={
            "min-h-full flex flex-col w-80 border-r bg-base-200 border-slate-500/30"
          }
        >
          <div className={"h-16 flex-none flex items-center pl-2"}>
            <Link href={"/"} className={"btn btn-ghost text-xl"}>
              Compartytion
            </Link>
          </div>
          <ul className={"menu flex-1 text-base-content p-4"}>
            <li>
              <label htmlFor={"dashboard-drawer"}>
                <a>Sidebar Item 1</a>
              </label>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
          <div className={"flex-none px-5 pb-5 space-y-5"}>
            <Suspense
              fallback={
                <div
                  className={
                    "p-3 border-slate-400/30 dark:border-slate-700/30 border rounded bg-base-100 flex items-center space-x-3"
                  }
                >
                  <div
                    className={"skeleton h-10 w-10 shrink-0 rounded-full"}
                  ></div>
                  <span className={"skeleton h-4 w-28"}></span>
                </div>
              }
            >
              <AccountInfo />
            </Suspense>
            <Link
              className={"btn btn-primary w-full"}
              href={"/hold/competition"}
            >
              새 대회 만들기 <MdArrowForward size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

async function AccountInfo() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;

  const res = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["profile"] },
  });

  if (!res.ok) {
    return null;
  }
  const profile: SimpleProfileType = await res.json();

  return (
    <div
      className={
        "p-3 border-slate-400/30 dark:border-slate-700/30 border rounded bg-base-100 flex items-center space-x-3 w-full"
      }
    >
      <ProfileCircle profile={profile} />
      <span className={"truncate flex-1"}>{profile.username}</span>
      <TextCopyButton text={profile.username} />
    </div>
  );
}
