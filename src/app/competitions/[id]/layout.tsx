import { ReactNode } from "react";

import BottomNavButtons from "@/app/competitions/[id]/_components/BottomNavButtons";
import SideBarNavButtons from "@/app/competitions/[id]/_components/SideBarNavButtons";
import ManagerContextProvider from "@/app/competitions/[id]/_components/ManagerContextProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ManagerContextProvider>
      <div className={"drawer md:drawer-open"}>
        <input
          id={"competition-drawer"}
          type={"checkbox"}
          className={"drawer-toggle"}
        />
        <div className={"drawer-content"}>
          <main>{children}</main>
          <div className={"btm-nav md:hidden"}>
            <BottomNavButtons />
          </div>
        </div>
        <div
          className={
            "drawer-side h-[calc(100vh-64px)] border-r border-slate-500/30"
          }
        >
          <label
            htmlFor={"competition-drawer"}
            aria-label={"사이드바 닫기"}
            className={"drawer-overlay"}
          ></label>
          <ul className={"w-80 menu menu-lg flex-1 text-base-content p-4"}>
            <SideBarNavButtons />
          </ul>
        </div>
      </div>
    </ManagerContextProvider>
  );
}
