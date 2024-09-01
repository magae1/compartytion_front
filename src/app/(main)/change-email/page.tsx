import React from "react";
import EmailForm from "@/app/(main)/settings/_components/EmailForm";

export default function Page() {
  return (
    <div className={"container px-5 flex justify-center"}>
      <div className={"max-w-96 w-full"}>
        <div className={"prose my-8"}>
          <h1>이메일 변경</h1>
          <p>계정의 이메일을 변경합니다.</p>
        </div>
        <EmailForm />
      </div>
    </div>
  );
}
