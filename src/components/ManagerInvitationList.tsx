"use client";
import { Dispatch, SetStateAction } from "react";

import ProfileSearchForm from "@/components/ProfileSearchForm";
import ProfileCard from "@/components/ProfileCard";
import { ProfileType } from "@/types";

interface Props {
  managers: ProfileType[];
  setManagers: Dispatch<SetStateAction<ProfileType[]>>;
}

export default function ManagerInvitationList(props: Props) {
  const { managers, setManagers } = props;

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

  return (
    <div>
      <ProfileSearchForm addManager={addManager} />
      <div className={"flex flex-col min-h-12 my-2 shadow-inner rounded-lg"}>
        {managers.length > 0 ? (
          managers.map((v) => (
            <ProfileCard
              key={v.username}
              profile={v}
              handleDeletion={deleteManager}
            />
          ))
        ) : (
          <p className={"text-center text-xs mt-4"}>
            대회 관리자를 초대해보세요.
          </p>
        )}
      </div>
      <div className={"label justify-end"}>
        {managers.length > 0 && (
          <p className={"label-text-alt"}>
            {managers.length}명에게 초대 메시지를 보냅니다.
          </p>
        )}
      </div>
    </div>
  );
}
