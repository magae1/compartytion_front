import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { SimpleProfileType } from "@/types";
import LogoutButton from "@/components/LogoutButton";
import ProfileCircle from "@/components/ProfileCircle";

export default async function AccountMenu() {
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
    return (
      <Link href={"/auth"} className={"btn btn-primary btn-sm"}>
        로그인
      </Link>
    );
  }
  const profileData: SimpleProfileType = await res.json();

  return (
    <div className={"dropdown dropdown-end h-11"}>
      <div tabIndex={0} role={"button"} className={"btn btn-circle"}>
        <ProfileCircle profile={profileData} />
      </div>
      <ul
        tabIndex={0}
        className={
          "dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
        }
      >
        <li>
          <Link href={"/dashboard"}>대시보드</Link>
        </li>
        <li>
          <Link href={"/settings"}>설정</Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
