"use client";
import { KeyboardEvent, useCallback, useRef, useState } from "react";
import { useFormState } from "react-dom";

import { ProfileType } from "@/types";
import { createCompetition } from "@/app/actions";
import ProfileSearchForm from "@/app/(main)/(form)/create-new-competition/_components/ProfileSearchForm";
import ProfileCard from "@/app/(main)/(form)/create-new-competition/_components/ProfileCard";

const initialState: {
  title?: string[];
  introduction?: string[];
  is_team_game?: string[];
  managers?: string[];
  success?: boolean;
  detail?: string;
} = {};

export default function Page() {
  const [state, formAction] = useFormState(createCompetition, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [managers, setManagers] = useState<ProfileType[]>([]);

  const addManager = (p: ProfileType) => {
    setManagers((prev) =>
      [...prev, p].reduce((a, b) => {
        if (a.find((i) => i.username === b.username)) {
          return a;
        }
        return [...a, b];
      }, [] as ProfileType[]),
    );
  };

  const deleteManager = (p: ProfileType) => {
    setManagers((prev) => prev.filter((v) => v.username != p.username));
  };

  const preventEnterKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }, []);

  const clickSubmitButton = useCallback(() => {
    formRef.current?.requestSubmit();
  }, [formRef.current]);

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
          />
          <div className={"label flex flex-col items-start"}>
            {state?.title?.map((v: string) => (
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
            className={"textarea textarea-bordered"}
            autoComplete={"off"}
          />
          <div className={"label flex flex-col items-start"}>
            {state?.introduction?.map((v: string) => (
              <p key={v} className={"label-text-alt text-error"}>
                {v}
              </p>
            ))}
          </div>
        </label>
        <div className={"form-control"}>
          <div className={"label peer"}>
            <span className={"label-text"}>팀 게임 여부</span>
            <label className={"cursor-pointer flex items-center space-x-2"}>
              <span>개인</span>
              <input
                type={"checkbox"}
                name={"is_team_game"}
                className={"toggle peer"}
              />
              <span>팀</span>
            </label>
          </div>
          <div className={"label peer-has-[:checked]:hidden"}>
            <p />
            <p className={"label-text-alt"}>
              대회 참가자들이 <strong>개인(1명)</strong>으로 참가합니다.
            </p>
          </div>
          <div className={"label hidden peer-has-[:checked]:flex"}>
            <p />
            <p className={"label-text-alt"}>
              대회 참가자들이 <strong>팀(1명 이상)</strong>으로 참가합니다.
            </p>
          </div>
        </div>
        <input
          hidden
          name={"managers"}
          value={managers.map((m) => m.username)}
          multiple
          readOnly
        />
      </form>
      <div className={"my-5"}>
        <div className={"label"}>
          <span className={"label-text"}>대회 관리자 초대</span>
        </div>
        <ProfileSearchForm addManager={addManager} />
        <div className={"flex flex-col gap-y-1"}>
          {managers.map((v) => (
            <ProfileCard
              key={v.username}
              profile={v}
              handleDeletion={deleteManager}
            />
          ))}
        </div>
        <div className={"label justify-end"}>
          <p className={"label-text-alt"}>
            {managers.length}명에게 초대 메시지를 보냅니다.
          </p>
        </div>
      </div>
      <button className={"btn w-full"} onClick={clickSubmitButton}>
        대회 만들기
      </button>
    </>
  );
}
