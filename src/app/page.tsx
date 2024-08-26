import React from "react";
import Link from "next/link";
import dayjs from "dayjs";

export default function Page() {
  return (
    <>
      <div className={"sticky-header"}>
        <nav className={"navbar"}>
          <div className={"flex-1"}>
            <Link href={"/"} className={"btn btn-ghost text-xl"}>
              Compartytion
            </Link>
          </div>
          <div className={"flex-none"}>
            <Link href={"/auth"} className={"btn btn-primary text-lg"}>
              로그인
            </Link>
          </div>
        </nav>
      </div>
      <main>
        <div style={{ height: "1666px" }}>123</div>
        <footer className={"footer prose footer-center text-base-content p-4"}>
          <aside>
            <p>{`Copyright © 컴파티션${dayjs().year()}`}</p>
          </aside>
        </footer>
      </main>
    </>
  );
}
