import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { CompetitionType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";
import ManagerContextSubscriber from "@/app/competitions/[id]/_components/ManagerContextSubscriber";

export default async function Page({ params }: { params: { id: string } }) {
  const accessToken = cookies().get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + `/competitions/${params.id}/`, {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    redirect(`/competitions/preview?competition_id=${params.id}`);
  }

  const competition: CompetitionType = await res.json();

  return (
    <div className={"prose px-5 my-5 max-w-screen-lg"}>
      <div className={"space-x-2 mb-1"}>
        <span className={"badge badge-lg badge-accent"}>
          {competition.status}
        </span>
        <span className={"badge badge-lg badge-ghost"}>
          {competition.is_team_game ? "팀" : "개인"}
        </span>
      </div>
      <h1>{competition.title}</h1>
      <div className={"grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-x-1"}>
        <div className={"col-span-2 flex items-center space-x-3"}>
          <ProfileCircle profile={competition.creator} size={12} />
          <div className={"flex flex-col"}>
            <span className={"truncate font-medium"}>
              {competition.creator_nickname}
            </span>
            <span className={"text-xs truncate"}>
              ID: {competition.creator.username}
            </span>
          </div>
        </div>
        <span className={"text-sm justify-self-end self-end"}>
          {dayjs(competition.created_at)
            .locale("ko")
            .format("YY년 MMM DD일(dd)")}
        </span>
      </div>
      <ManagerContextSubscriber isManager={competition.is_manager} />
    </div>
  );
}
