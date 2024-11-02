"use client";
import { useActionState } from "react";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";

import SubmitButton from "@/components/SubmitButton";
import { ActionResType } from "@/types";
import { LogInType } from "@/schemas";

const initialState: { email?: string[]; password?: string[] } = {};

interface Props {
  email?: string;
  action: (
    prev: any,
    formData: FormData,
  ) => Promise<ActionResType<LogInType, any>>;
}

export default function LogInForm({ email, action }: Props) {
  const [state, formAction] = useActionState(action, {
    value: { email: email ?? "", password: "" },
    message: initialState,
    isError: false,
  });

  return (
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          <IoMailOutline />
          <input
            name={"email"}
            defaultValue={state.value.email}
            className={"grow"}
            placeholder={"이메일 주소를 입력해주세요."}
            autoComplete={"username"}
          />
        </label>
        <div className={"label"}>
          {state.message.email?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label className={"form-input-label"}>
          <IoKeyOutline />
          <input
            type={"password"}
            name={"password"}
            defaultValue={state.value.password}
            className={"grow"}
            placeholder={"비밀번호를 입력해주세요."}
            autoComplete={"current-password"}
          />
        </label>
        <div className={"label"}>
          {state.message.password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <SubmitButton>기존 이메일로 로그인</SubmitButton>
    </form>
  );
}
