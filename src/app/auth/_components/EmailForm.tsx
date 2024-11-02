"use client";
import { useActionState } from "react";
import { IoMailOutline } from "react-icons/io5";

import SubmitButton from "@/components/SubmitButton";
import { ActionResType } from "@/types";
import { AuthType } from "@/schemas";

const initialState: { email?: string[] } = {};

interface Props {
  action: (
    prev: any,
    formData: FormData,
  ) => Promise<ActionResType<AuthType, any>>;
}

export default function EmailForm(props: Props) {
  const [state, formAction] = useActionState(props.action, {
    value: { email: "" },
    message: initialState,
    isError: false,
  });

  return (
    <form action={formAction}>
      <label className={"form-input-label"}>
        <IoMailOutline />
        <input
          name={"email"}
          className={"grow"}
          placeholder={"이메일 주소를 입력해주세요"}
          autoComplete={"username"}
          defaultValue={state.value.email}
        />
      </label>
      <div className={"label"}>
        {state.message.email?.map((v: string) => (
          <p key={v} className={"label-text-alt text-error"}>
            {v}
          </p>
        ))}
      </div>
      <SubmitButton>이메일로 계속</SubmitButton>
    </form>
  );
}
