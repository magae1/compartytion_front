"use client";
import { useFormState } from "react-dom";
import { IoMailOutline } from "react-icons/io5";

import SubmitButton from "@/components/SubmitButton";

const initialState: { email?: string[] } = {};

export default function EmailForm({ action }: { action: any }) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction}>
      <label className={"form-input-label"}>
        <IoMailOutline />
        <input
          name={"email"}
          className={"grow"}
          placeholder={"이메일 주소를 입력해주세요."}
          autoComplete={"username"}
        />
      </label>
      <div className={"label"}>
        {state?.email?.map((v: string) => (
          <p key={v} className={"label-text-alt text-error"}>
            {v}
          </p>
        ))}
      </div>
      <SubmitButton>이메일로 계속</SubmitButton>
    </form>
  );
}
