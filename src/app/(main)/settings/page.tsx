import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MdLaunch } from "react-icons/md";

import { AccountType } from "@/types";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import ProfileForm from "@/app/(main)/settings/_components/ProfileForm";

export default async function Page() {
  const accessToken = cookies().get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/accounts/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    redirect("/auth");
  }
  const accountData: AccountType = await res.json();

  return (
    <div
      className={
        "flex flex-col space-y-10 grow container px-3 py-10 max-w-screen-md"
      }
    >
      <h1 className={"text-5xl"}>설정</h1>
      <div className={"setting-child-wrapper"}>
        <h2 className={"text-xl font-semibold mb-5"}>프로필</h2>
        <ProfileForm profile={accountData.profile} />
      </div>
      <div className={"setting-child-wrapper"}>
        <h2 className={"text-xl font-semibold mb-5"}>계정</h2>
        <div
          className={"flex flex-col *:text-left space-y-1 *:justify-between"}
        >
          <Link href={"/change-email"} className={"btn btn-ghost"}>
            <span>이메일 변경</span>
            <span>
              <MdLaunch size={21} />
            </span>
          </Link>
          <Link href={"/change-password"} className={"btn btn-ghost"}>
            <span>비밀번호 변경</span>
            <span>
              <MdLaunch size={21} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
