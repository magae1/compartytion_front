import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { BASE_URL, DEFAULT_HEADERS } from "@/constants";
import { SimpleCompetitionType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;

  const res = await fetch(BASE_URL + `/competitions/${params.id}/preview`, {
    headers: {
      ...DEFAULT_HEADERS,
    },
  });

  if (!res.ok) {
    notFound();
  }

  const competition: SimpleCompetitionType = await res.json();

  return (
    <main className={"px-5 my-5 max-w-screen-md container"}>
      <div className={"space-x-2 mb-1"}>
        <span className={"badge badge-lg badge-accent"}>
          {competition.status}
        </span>
        <span className={"badge badge-lg badge-ghost"}>
          {competition.is_team_game ? "팀" : "개인"}
        </span>
      </div>
      <h1 className={"text-5xl font-bold mb-7"}>{competition.title}</h1>
      <div
        className={"grid grid-cols-1 sm:grid-cols-3 gap-y-2 sm:gap-x-1 mb-5"}
      >
        <div className={"col-span-2 flex items-center space-x-3"}>
          <ProfileCircle profile={competition.creator.profile} size={12} />
          <div className={"flex flex-col"}>
            <span className={"truncate font-medium"}>
              {competition.creator.profile.username}
            </span>
          </div>
        </div>
        <span className={"text-sm justify-self-end self-end"}>
          {dayjs(competition.created_at)
            .locale("ko")
            .format("YY년 MMM DD일(dd)")}
        </span>
      </div>
      <p
        className={"min-h-40 border border-gray-500/10 rounded px-3 py-2 mb-5"}
      >
        {competition.introduction}
      </p>
      <div className={"flex"}>
        <div className={"flex flex-col mx-auto"}>
          {competition.status === "모집중" && (
            <>
              <Link
                href={`/entrance/competitions/${competition.id}/`}
                className={"btn btn-wide no-underline"}
              >
                대회에 들어가기
              </Link>
              <div className={"divider text-xs"}>또는</div>
              <Link
                href={`/enroll/competitions/${competition.id}/`}
                className={"btn btn-wide no-underline"}
              >
                참가 신청하러 가기
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
