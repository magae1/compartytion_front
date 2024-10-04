import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { BASE_URL, DEFAULT_HEADERS } from "@/constants";
import { SimpleCompetitionType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: Props) {
  if (!searchParams || !searchParams.competition_id) {
    notFound();
  }

  const res = await fetch(
    BASE_URL + `/competitions/${searchParams.competition_id}/preview`,
    {
      headers: {
        ...DEFAULT_HEADERS,
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const competition: SimpleCompetitionType = await res.json();
  return (
    <main className={"prose px-5 my-5 max-w-screen-md container"}>
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
              {competition.creator.username}
            </span>
          </div>
        </div>
        <span className={"text-sm justify-self-end self-end"}>
          {dayjs(competition.created_at)
            .locale("ko")
            .format("YY년 MMM DD일(dd)")}
        </span>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">21% more than last month</div>
        </div>
      </div>
      <p className={"min-h-50"}>{competition.introduction}</p>
      <div className={"flex justify-center space-x-3"}>
        {competition.status === "모집중" && (
          <Link
            href={`/enroll/competition?competition_id=${competition.id}`}
            className={"btn btn-wide no-underline"}
          >
            참가 신청하러 가기
          </Link>
        )}
      </div>
    </main>
  );
}
