import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className={"form-header"}>새 대회 만들기</h1>
      <Suspense
        fallback={
          <div className={"flex w-full flex-col"}>
            <div className={"skeleton h-5 w-12 my-2"}></div>
            <div className={"skeleton h-12 w-full mb-4 rounded-lg"}></div>
            <div className={"skeleton h-5 w-20 my-2"}></div>
            <div className={"skeleton h-16 w-full mb-4 rounded-lg"}></div>
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
