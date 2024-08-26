import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ProfileType } from "@/types";
import LogoutBtn from "@/components/LogoutBtn";

interface Props {
  profileData: ProfileType;
}

export default function AccountMenu({ profileData }: Props) {
  return (
    <div className={"dropdown dropdown-end"}>
      <div
        tabIndex={0}
        role={"button"}
        className={`avatar btn btn-circle ${profileData.avatar ? "" : "placeholder"}`}
      >
        <div
          className={
            "relative w-10 bg-neutral text-neutral-content z-10 rounded-full"
          }
        >
          {profileData.avatar ? (
            <Image
              src={profileData.avatar}
              alt={`${profileData.account}'s avatar`}
              style={{ zIndex: 0 }}
              unoptimized
              fill
            />
          ) : (
            <span>{profileData.account.at(0)}</span>
          )}
        </div>
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
  );
}
