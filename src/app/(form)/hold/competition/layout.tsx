import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className={"form-header"}>새 대회 만들기</h1>
      {children}
    </>
  );
}
