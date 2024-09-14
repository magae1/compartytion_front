"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();

  const header = useMemo(() => {
    if (pathName === "/change-email") {
      return "이메일 변경";
    }
    if (pathName === "/change-password") {
      return "비밀번호 변경";
    }
    if (pathName === "/create-new-competition") {
      return "새 대회 만들기";
    }
    return "";
  }, [pathName]);

  return <h1 className={"text-center text-3xl font-bold mb-5"}>{header}</h1>;
}
