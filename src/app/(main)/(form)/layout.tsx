import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_IS_AUTH } from "@/constants";
import Header from "@/app/(main)/_components/Header";

export default function Layout({ children }: { children: ReactNode }) {
  const is_authenticated = cookies().get(COOKIE_IS_AUTH)?.value === "true";
  if (!is_authenticated) {
    redirect("/auth");
  }
  return (
    <div className={"container px-5 pt-5 max-w-96 w-full"}>
      <Header />
      {children}
    </div>
  );
}
