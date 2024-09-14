import React from "react";
import Image from "next/image";

import { ProfileType } from "@/types";

interface Props {
  profile: ProfileType;
  size?: number;
}

export default function ProfileCircle(props: Props) {
  const { profile, size = 10 } = props;

  return (
    <div className={`avatar ${profile.avatar ? "" : "placeholder"}`}>
      <div
        className={`w-${size} h-${size} bg-neutral text-neutral-content rounded-full`}
      >
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={`${profile.username}'s avatar`}
            width={4 * size}
            height={4 * size}
            style={{ margin: "0px" }}
            unoptimized
          />
        ) : (
          <span>{profile.username.at(0)}</span>
        )}
      </div>
    </div>
  );
}