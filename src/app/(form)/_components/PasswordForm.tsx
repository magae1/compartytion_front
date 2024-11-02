"use client";
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { changePassword } from "@/app/actions";
import SubmitButton from "@/components/SubmitButton";

const initialState: {
  detail?: string;
  password?: string[];
  new_password?: string[];
  new_password_confirmation?: string[];
} = {};

export default function PasswordForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(changePassword, {
    value: {
      password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    message: initialState,
    isError: false,
  });

  useEffect(() => {
    if (!state.isError && state.message.detail) {
      toast.success(state.message.detail ?? "");
      router.back();
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
          defaultValue={state.value.password}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.password?.map((v: string) => (
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
          defaultValue={state.value.new_password}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.new_password?.map((v: string) => (
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
          name={"new_password_confirmation"}
          className={"input input-bordered"}
          autoComplete={"new-password"}
          defaultValue={state.value.new_password_confirmation}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.new_password_confirmation?.map((v: string) => (
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
