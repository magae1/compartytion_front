"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  return (
    <div className={"w-full flex flex-col justify-center items-center"}>
      <h2 className={"mt-[30vh] text-center text-3xl font-semibold"}>
        {error.message}
      </h2>
      <p>{error.digest}</p>
      <button
        onClick={() => router.push("/auth/login")}
        className={"btn btn-wide mt-5"}
      >
        로그인 하러 가기
      </button>
    </div>
  );
}
