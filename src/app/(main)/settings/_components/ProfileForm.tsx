"use client";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
  useActionState,
} from "react";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa6";

import { ProfileType } from "@/types";
import { changeProfile } from "@/app/actions";

const initialState: {
  avatar?: string[];
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [state, formAction] = useActionState(changeProfile, initialState);
  const [showDetail, setShowDetail] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || !e.target.files[0]) {
      setImageFile(null);
      return;
    }
    setImageFile(e.target.files[0]);
  };

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
    <form className={"flex flex-wrap sm:space-x-5"} action={formAction}>
      <div className={"flex flex-col space-y-3 w-3/5 sm:w-1/3"}>
        <div className={"avatar placeholder"}>
          <div
            className={
              "relative bg-neutral text-neutral-content mask mask-squircle w-full"
            }
          >
            {imageFile ? (
              <img src={URL.createObjectURL(imageFile)} />
            ) : profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={`${profile.username}'s avatar`}
                fill
              />
            ) : (
              <span className={"text-3xl md:text-6xl"}>
                {profile.username.at(0)}
              </span>
            )}
          </div>
        </div>
        <label
          className={`btn btn-sm ${editable ? "btn-outline" : "btn-disabled"}`}
        >
          <input
            type={"file"}
            name={"avatar"}
            hidden
            accept={"image/*"}
            onChange={handleImageChange}
            disabled={!editable}
          />
          <MdAddAPhoto
            size={21}
            className={"w-0 invisible md:w-auto md:visible"}
          />
          프로필 사진 변경
        </label>
        <div className={"label"}>
          {state.avatar?.map((v: string) => (
            <p key={v} className={"label-text-alt text-error"}>
              {v}
            </p>
          ))}
        </div>
      </div>
      <div className={"flex-1 w-min-240"}>
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
            {state.username?.map((v: string) => (
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
            {state.instroduction?.map((v: string) => (
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
      </div>
    </form>
  );
}
