"use client";
import {
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
  useActionState,
} from "react";

import { ProfileType } from "@/types";
import { createCompetition } from "@/app/actions";
import ManagerInvitationList from "@/components/ManagerInvitationList";

const initialState: {
  title?: string[];
  introduction?: string[];
  is_team_game?: string[];
  managers?: string[];
  detail?: string;
} = {};

export default function Page() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(createCompetition, {
    value: {
      title: "",
      is_team_game: false,
      managers: [],
    },
    message: initialState,
    isError: false,
  });
  const [managers, setManagers] = useState<ProfileType[]>([]);

  const preventEnterKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }, []);

  const clickSubmitButton = useCallback(() => {
    formRef.current?.requestSubmit();
  }, []);

  return (
    <>
      <form action={formAction} ref={formRef}>
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>대회명*</span>
          </div>
          <input
            name={"title"}
            className={"input input-bordered"}
            autoComplete={"off"}
            onKeyDown={preventEnterKey}
            defaultValue={state.value.title}
          />
          <div className={"label flex flex-col items-start"}>
            {state.message.title?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <label className={"form-control"}>
          <div className={"label"}>
            <span className={"label-text"}>대회 소개글</span>
          </div>
          <textarea
            name={"introduction"}
            className={"textarea textarea-bordered leading-5"}
            autoComplete={"off"}
            defaultValue={state.value.introduction}
          />
          <div className={"label justify-end"}>
            <span className={"label-text-alt"}>
              참가를 희망하는 사람들에게 대회에 대해서 간단하게 소개해주세요.
            </span>
          </div>
        </label>
        <div className={"form-control group"}>
          <div className={"label"}>
            <span className={"label-text"}>팀 게임 여부</span>
            <label className={"cursor-pointer flex items-center space-x-2"}>
              <span>개인</span>
              <input
                type={"checkbox"}
                name={"is_team_game"}
                className={"toggle peer"}
                defaultChecked={state.value.is_team_game}
              />
              <span>팀</span>
            </label>
          </div>
          <div className={"label justify-end"}>
            <p className={"label-text-alt group-has-[:checked]:hidden"}>
              대회 참가자들이 <strong>개인(1명)</strong>으로 참가합니다.
            </p>
            <p className={"label-text-alt hidden group-has-[:checked]:block"}>
              대회 참가자들이 <strong>팀(1명 이상)</strong>으로 참가합니다.
            </p>
          </div>
        </div>
        <input
          hidden
          name={"managers"}
          value={managers.map((v) => v.username).join(",")}
        />
      </form>
      <div className={"my-5"}>
        <div className={"label"}>
          <span className={"label-text"}>대회 관리자 초대</span>
        </div>
        <ManagerInvitationList managers={managers} setManagers={setManagers} />
      </div>
      <button className={"btn w-full mb-10"} onClick={clickSubmitButton}>
        대회 만들기
      </button>
    </>
  );
}
