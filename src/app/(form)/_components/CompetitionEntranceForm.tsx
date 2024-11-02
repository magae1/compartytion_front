"use client";

import { useActionState } from "react";

import SubmitButton from "@/components/SubmitButton";
import { CompetitionEntranceType } from "@/schemas";
import { ActionResType } from "@/types";

interface Props {
  action: (
    prev: any,
    formData: FormData,
  ) => Promise<ActionResType<CompetitionEntranceType, any>>;
}

const initialState: {
  access_id?: string[];
  access_password?: string[];
} = {};

export default function CompetitionEntranceForm(props: Props) {
  const [state, formAction] = useActionState(props.action, {
    value: {
      competition: "",
      access_id: "",
      access_password: "",
    },
    message: initialState,
    isError: false,
  });

  return (
    <form action={formAction}>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>접속 아이디*</span>
        </div>
        <input
          name={"access_id"}
          className={"input input-bordered"}
          autoComplete={"off"}
          defaultValue={state.value.access_id}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.access_id?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>접속 비밀번호*</span>
        </div>
        <input
          name={"access_password"}
          type={"password"}
          className={"input input-bordered"}
          autoComplete={"off"}
          defaultValue={state.value.access_password}
        />
        <div className={"label flex flex-col items-start"}>
          {state.message.access_password?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <SubmitButton>대회 입장하기</SubmitButton>
    </form>
  );
}
