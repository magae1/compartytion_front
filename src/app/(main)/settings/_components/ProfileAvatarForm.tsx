"use client";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdAddAPhoto, MdRemoveCircleOutline } from "react-icons/md";

import { ProfileType } from "@/types";

interface Props {
  profile: ProfileType;
}

export default function ProfileAvatarForm(props: Props) {
  const { profile } = props;
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  const formAction = async (formData: FormData) => {
    const res = await fetch("/api/upload/avatar/", {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      router.refresh();
      setImage(null);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || !e.target.files[0]) {
      setImage(null);
      return;
    }
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className={"avatar placeholder"}>
        <div
          className={
            "relative bg-neutral text-neutral-content mask mask-squircle w-full"
          }
        >
          {image ? (
            <img src={URL.createObjectURL(image)} />
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
          <div
            className={
              "absolute w-full h-full bg-black opacity-0 hover:opacity-70 cursor-pointer transition-opacity flex justify-center items-center"
            }
            onClick={() => {
              if (image) {
                setImage(null);
              } else {
                imageInputRef.current?.click();
              }
            }}
          >
            {image ? (
              <MdRemoveCircleOutline size={56} />
            ) : (
              <MdAddAPhoto size={56} />
            )}
          </div>
        </div>
      </div>
      <form className={"flex-1"} action={formAction}>
        <input
          type={"file"}
          name={"avatar"}
          hidden
          ref={imageInputRef}
          onChange={handleImageChange}
          accept={"image/png, image/jpeg"}
        />
        <button
          className={`btn w-full btn-sm ${image ? "btn-outline" : "btn-disabled"}`}
          disabled={!image}
        >
          프로필 사진 변경
        </button>
      </form>
    </>
  );
}
