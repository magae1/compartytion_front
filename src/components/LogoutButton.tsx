"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logOut = useCallback(async () => {
    await fetch("/api/logout/", { method: "POST" }).then(() =>
      router.refresh()
    );
  }, []);

  return (
    <div className={"hover:bg-red-500 hover:text-white"} onClick={logOut}>
      로그아웃
    </div>
  );
}
