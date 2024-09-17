import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { MdLaunch } from "react-icons/md";

import { AccountType } from "@/types";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import ProfileForm from "@/app/(main)/settings/_components/ProfileForm";
import CompetitionProfileForm from "@/app/(main)/settings/_components/CompetitionProfileForm";

export default async function Page() {
  const accessToken = cookies().get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/accounts/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("계정 정보를 찾을 수 없습니다.");
  }
  const accountData: AccountType = await res.json();

  return (
    <div className={"flex flex-col px-5 md:pl-10 py-5 max-w-screen-md"}>
      <h1 className={"text-5xl font-bold mt-3 mb-7"}>설정</h1>
      <h2 className={"text-xl font-semibold pb-3"}>프로필 설정</h2>
      <div>
        <ProfileForm profile={accountData.profile} />
      </div>
      <div className={"divider"}></div>
      <h2 className={"text-xl font-semibold pb-3"}>참가 신청 템플릿 설정</h2>
      <p className={"text-sm text-base-content pb-5"}>
        대회 참가 신청 시 템플릿을 불러올 수 있습니다.
      </p>

      <div className={"max-w-sm"}>
        <CompetitionProfileForm profile={accountData.profile} />
      </div>
      <div className={"divider"}></div>
      <h2 className={"text-xl font-semibold pb-3"}>계정 설정</h2>
      <div className={"flex flex-col *:text-left space-y-1 *:justify-between"}>
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
  );
}
