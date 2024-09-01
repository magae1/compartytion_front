"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      fetch("/api/refresh/", {
        method: "POST",
      })
        .then(() => {
          const path = searchParams.get("path");
          if (path) {
            const pathStr = decodeURI(path);
            router.push(pathStr);
          } else {
            router.push("/");
          }
        })
        .catch(() => {
          router.push("/auth");
        });
    } else {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div className={"flex w-screen h-screen justify-center items-center"}>
      <span className={"loading loading-dots loading-lg"}></span>
    </div>
  );
}
