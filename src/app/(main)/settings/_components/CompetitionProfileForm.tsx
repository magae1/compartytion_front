"use client";
import { useFormState } from "react-dom";

import { changeProfile } from "@/app/actions";
import { ProfileType } from "@/types";
import { useEffect, useState } from "react";

const tooltip = {
  display: "대회 참가자, 관리자 모두에게 보여지는 이름입니다.",
  hidden: "대회 관리자에게만 보여지는 이름입니다.",
};

const initialState: {
  displayed_name?: string[];
  hidden_name?: string[];
  success?: boolean;
  detail?: string;
} = {};

interface Props {
  profile: ProfileType;
}

export default function CompetitionProfileForm({ profile }: Props) {
  const [state, formAction] = useFormState(changeProfile, initialState);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setShowDetail(true);
    const timer = setTimeout(() => {
      setShowDetail(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [state]);

  return (
    <form action={formAction}>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>공개 이름</span>
          <span className={"label-text-alt"}>{tooltip.display}</span>
        </div>
        <input
          name={"displayed_name"}
          defaultValue={profile.displayed_name ?? ""}
          className={"input input-bordered"}
          autoComplete={"off"}
        />
        <div className={"label"}>
          {state.displayed_name?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>비공개 이름</span>
          <span className={"label-text-alt"}>{tooltip.hidden}</span>
        </div>
        <input
          name={"hidden_name"}
          defaultValue={profile.hidden_name ?? ""}
          className={"input input-bordered"}
          autoComplete={"off"}
        />
        <div className={"label"}>
          {state.hidden_name?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <div className={"flex justify-end items-center space-x-3"}>
        {showDetail && (
          <span className={"text-success text-sm"}>{state.detail}</span>
        )}
        <button className={"btn btn-sm btn-outline"}>변경</button>
      </div>
    </form>
  );
}
