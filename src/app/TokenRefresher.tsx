"use client";
import { ReactNode, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "cookies-next";

import useLocalStorage from "@/hooks/useLocalStorage";
import { mainFetcher } from "@/fetchers";

export default function TokenRefresher({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [setItem, getItem] = useLocalStorage();
  const [tokenExpireTime, setTokenExpireTime] = useState<number>(0);

  const tokenFetcher = () => {
    const token = getItem("refresh") ?? "";
    mainFetcher
      .post("/token/refresh/", { refresh: token })
      .then((r) => {
        const token = r.data.access;
        const decode = jwtDecode(token);
        setTokenExpireTime(decode.exp ?? 0);
        setItem("access", r.data.access);
        setCookie("is_authenticated", true);
      })
      .catch(() => {
        setCookie("is_authenticated", false);
      });
  };

  useEffect(() => {
    if (mounted) {
      tokenFetcher();
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted && tokenExpireTime > 0) {
      const timeout = tokenExpireTime * 1000 - Date.now() - 30000;
      console.log(timeout);
      setTimeout(tokenFetcher, timeout);
    }
  }, [mounted, tokenExpireTime]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{children}</>;
}
