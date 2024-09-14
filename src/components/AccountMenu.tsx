import React from "react";
import Link from "next/link";

import { ProfileType } from "@/types";
import LogoutBtn from "@/components/LogoutBtn";
import ProfileCircle from "@/components/ProfileCircle";

interface Props {
  profileData: ProfileType;
}

export default function AccountMenu({ profileData }: Props) {
  return (
    <>
      <div className={"flex flex-col grow container mx-auto px-4"}>
        <div className={"shadow"}></div>
      </div>
      <div className={"dropdown dropdown-end"}>
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
            <LogoutBtn />
          </li>
        </ul>
      </div>
    </>
  );
}
