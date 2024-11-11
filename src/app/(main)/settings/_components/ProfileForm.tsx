"use client";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  useActionState,
} from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";

import { ProfileType } from "@/types";
import { changeProfile } from "@/app/actions";

const initialState: {
  username?: string[];
  introduction?: string[];
  success?: boolean;
  detail?: string;
} = {};

interface Props {
  profile: ProfileType;
}

export default function ProfileForm(props: Props) {
  const { profile } = props;
  const [editable, setEditable] = useState(false);

  const [state, formAction] = useActionState(changeProfile, {
    value: null,
    isError: false,
    message: initialState,
  });
  const [showDetail, setShowDetail] = useState(false);

  const toggleEditable = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditable((prev) => !prev);
  }, []);

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
          <span className={"label-text"}>사용자명</span>
        </div>
        <input
          name={"username"}
          defaultValue={profile.username}
          className={"input input-bordered"}
          autoComplete={"off"}
          disabled={!editable}
        />
        <div className={"label"}>
          {state.message.username?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <label className={"form-control"}>
        <div className={"label"}>
          <span className={"label-text"}>소개글</span>
        </div>
        <textarea
          name={"introduction"}
          className={"grow textarea textarea-bordered leading-normal"}
          defaultValue={profile.introduction ?? ""}
          rows={4}
          disabled={!editable}
        />
        <div className={"label"}>
          {state.message.instroduction?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </label>
      <div className={"flex justify-end items-center space-x-3"}>
        {showDetail && (
          <span className={"text-success text-sm"}>{state.message.detail}</span>
        )}
        <div
          onClick={toggleEditable}
          className={"btn btn-square btn-sm btn-accent"}
        >
          {editable ? <FaLockOpen /> : <FaLock />}
        </div>
        <button
          type={"submit"}
          disabled={!editable}
          className={"btn btn-outline btn-sm"}
        >
          변경
        </button>
      </div>
    </form>
  );
}
