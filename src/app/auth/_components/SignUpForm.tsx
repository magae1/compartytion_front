"use client";
import { useActionState } from "react";
import {
  IoKeyOutline,
  IoKeySharp,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";

import SubmitButton from "@/components/SubmitButton";
import { ActionResType } from "@/types";
import { SignupType } from "@/schemas";

const initialState: {
  email?: string[];
  password?: string[];
  username: string[];
  confirm?: string[];
} = {
  username: ["사이트 내에서 각 계정이 가지는 고유한 별명입니다."],
};

interface Props {
  email?: string;
  action: (
    prev: any,
    formData: FormData,
  ) => Promise<ActionResType<SignupType, any>>;
}

export default function SignUpForm(props: Props) {
  const { email, action } = props;
  const [state, formAction] = useActionState(action, {
    value: { email: email ?? "", password: "", confirm: "", username: "" },
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
          <IoPersonOutline />
          <input
            name={"username"}
            placeholder={"사용자명을 입력해주세요."}
            autoComplete={"off"}
            defaultValue={state.value.username}
          />
        </label>
        <div className={"label"}>
          {state.message.username?.map((v: string) => (
            <p
              key={v}
              className={`label-text-alt ${!state.message.username || initialState.username[0] != state.message.username[0] ? "text-error" : ""}`}
            >
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
            autoComplete={"new-password"}
            defaultValue={state.value.password}
          />
        </label>
        <div className={"label flex flex-col items-start"}>
          {state.message.password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div>
        <label className={"form-input-label"}>
          <IoKeySharp />
          <input
            type={"password"}
            name={"confirm"}
            className={"grow"}
            placeholder={"비밀번호(확인)를 입력해주세요."}
            autoComplete={"new-password"}
            defaultValue={state.value.confirm}
          />
        </label>
        <div className={"label flex flex-col items-start"}>
          {state.message.confirm?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <SubmitButton>새 계정 만들기</SubmitButton>
    </form>
  );
}
