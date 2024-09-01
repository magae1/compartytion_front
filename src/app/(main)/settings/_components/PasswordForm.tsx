"use client";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

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
  const [state, formAction] = useFormState(changePassword, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.detail ?? "");
    }
  }, [state]);

  return (
    <form action={formAction}>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>현재 비밀번호</span>
        </div>
        <input
          type={"password"}
          name={"password"}
          className={"input input-bordered"}
          autoComplete={"off"}
        />
        <div className={"label flex flex-col items-start"}>
          {state.password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>새 비밀번호</span>
        </div>
        <input
          type={"password"}
          name={"new_password"}
          className={"input input-bordered"}
          autoComplete={"new-password"}
        />
        <div className={"label flex flex-col items-start"}>
          {state.new_password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>새 비밀번호(확인)</span>
        </div>

        <input
          type={"password"}
          name={"new_password"}
          className={"input input-bordered"}
          autoComplete={"new-password"}
        />
        <div className={"label flex flex-col items-start"}>
          {state.new_password_confirmation?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <SubmitButton>변경</SubmitButton>
    </form>
  );
}
