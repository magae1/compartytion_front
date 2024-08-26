"use client";
import { useFormState } from "react-dom";
import { IoMailOutline, IoKeyOutline } from "react-icons/io5";

import SubmitButton from "@/components/SubmitButton";

const initialState: { email?: string[]; password?: string[] } = {};

interface Props {
  email?: string;
  action: any;
}

export default function LogInForm({ email, action }: Props) {
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form action={formAction}>
      <div>
        <label className={"form-input-label"}>
          <IoMailOutline />
          <input
            name={"email"}
            defaultValue={email}
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
      </div>
      <div>
        <label className={"form-input-label"}>
          <IoKeyOutline />
          <input
            type={"password"}
            name={"password"}
            className={"grow"}
            placeholder={"비밀번호를 입력해주세요."}
            autoComplete={"current-password"}
          />
        </label>
        <div className={"label"}>
          {state?.password?.map((v: string) => (
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
