"use client";
import { memo, useContext } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  MdOutlineHome,
  MdOutlineSettings,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { LuCompass } from "react-icons/lu";

import { ManagerContext } from "@/app/competitions/[id]/_components/ManagerContextProvider";

const BottomNavButtons = () => {
  const { isManager } = useContext(ManagerContext);
  const params = useParams();
  const pathName = usePathname();
  const currentPath = pathName.split("/").at(3);

  return (
    <>
      <Link
        href={`/competitions/${params.id}/home`}
        className={currentPath === "home" ? "active" : undefined}
      >
        <MdOutlineHome size={24} />
        <span className={"btm-nav-label"}>홈</span>
      </Link>
      <Link
        href={`/competitions/${params.id}/explore`}
        className={currentPath === "explore" ? "active" : undefined}
      >
        <LuCompass size={24} />
        <span className={"btm-nav-label"}>탐색</span>
      </Link>
      <Link
        href={`/competitions/${params.id}/${isManager ? "manage" : "setting"}`}
        className={
          currentPath === "settings" || currentPath === "manage"
            ? "active"
            : undefined
        }
      >
        {isManager ? (
          <MdOutlineManageAccounts size={24} />
        ) : (
          <MdOutlineSettings size={24} />
        )}
        <span className={"btm-nav-label"}>{isManager ? "관리" : "설정"}</span>
      </Link>
    </>
  );
};

export default memo(BottomNavButtons);
