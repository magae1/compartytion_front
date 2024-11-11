"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { SimpleCompetitionType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";

interface Props {
  containerId: string;
  competition: SimpleCompetitionType;
}

export default function CompetitionDetailsButton({
  containerId,
  competition,
}: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const toggleDetails = () => setOpen((prev) => !prev);

  const details = useMemo(() => {
    return (
      <div
        className={`rounded-lg shadow dark:shadow-xl p-3 border border-slate-300/30 dark:border-slate-700/30 mb-3 hidden has-[:checked]:block`}
      >
        <input hidden readOnly type="checkbox" checked={open} />
        <div className={"space-x-2 mb-1"}>
          <span className={"badge badge-lg badge-accent"}>
            {competition.status}
          </span>
          <span className={"badge badge-lg badge-ghost"}>
            {competition.is_team_game ? "팀" : "개인"}
          </span>
        </div>
        <h3 className={"text-3xl font-bold mb-5"}>{competition.title}</h3>
        <div className={"grid grid-cols-3 mb-3"}>
          <div className={"col-span-2 flex items-center space-x-3"}>
            <ProfileCircle profile={competition.creator.profile} />
            <div className={"flex flex-col"}>
              <span className={"truncate font-medium"}>
                {competition.creator.profile.username}
              </span>
            </div>
          </div>
          <span className={"text-sm justify-self-end self-end"}>
            {dayjs(competition.created_at).locale("ko").format("MMM DD일(dd)")}
          </span>
        </div>
        <p className={"min-h-10 border border-gray-500/10 rounded px-2 py-3"}>
          {competition.introduction}
        </p>
      </div>
    );
  }, [competition, open]);

  useEffect(() => {
    setContainer(document.getElementById(containerId));
  }, []);

  return (
    <>
      <div className={"tooltip"} data-tip={"자세히 보기"}>
        <button className={"btn form-header m-0"} onClick={toggleDetails}>
          {competition.title}
        </button>
      </div>
      {container && createPortal(details, container)}
    </>
  );
}
