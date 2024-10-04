"use client";
import { ReactNode, useContext, useEffect } from "react";
import { ManagerContext } from "@/app/competitions/[id]/_components/ManagerContextProvider";

interface Props {
  children?: ReactNode;
  isManager: boolean;
}

export default function ManagerContextSubscriber(props: Props) {
  const { children, isManager } = props;
  const { setIsManager } = useContext(ManagerContext);

  useEffect(() => {
    setIsManager(isManager);
  }, [isManager]);

  return <>{children}</>;
}
