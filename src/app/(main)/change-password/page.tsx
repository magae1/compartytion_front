import React from "react";
import PasswordForm from "@/app/(main)/settings/_components/PasswordForm";

export default function Page() {
  return (
    <div className={"container px-5 flex justify-center"}>
      <div className={"max-w-96 w-full"}>
        <div className={"prose my-8"}>
          <h1>비밀번호 변경</h1>
          <p>계정의 비밀번호를 변경합니다.</p>
        </div>
        <PasswordForm />
      </div>
    </div>
  );
}
