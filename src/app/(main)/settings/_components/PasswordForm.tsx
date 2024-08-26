"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { changePassword } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: {
  detail?: string;
  password?: string[];
  new_password?: string[];
  new_password_confirmation?: string[];
  success?: boolean;
} = {};

export default function PasswordForm() {
  const router = useRouter();

  const [state, formAction] = useFormState(changePassword, initialState);

  useEffect(() => {
    if (state.success) {
    } else if (state.detail) {
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          현재 비밀번호
          <input
            type={"password"}
            name={"password"}
            className={"grow"}
            autoComplete={"current-password"}
          />
        </label>
        <div className={"label"}>
          {state.password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label className={"form-input-label"}>
          새 비밀번호
          <input
            type={"password"}
            name={"new_password"}
            className={"grow"}
            autoComplete={"new-password"}
          />
        </label>
        <div className={"label flex flex-col items-start"}>
          {state.new_password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label className={"form-input-label"}>
          새 비밀번호(확인)
          <input
            type={"password"}
            name={"new_password"}
            className={"grow"}
            autoComplete={"new-password"}
          />
        </label>
        <div className={"label flex flex-col items-start"}>
          {state.new_password_confirmation?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <SubmitButton>변경</SubmitButton>
    </form>
  );
}
