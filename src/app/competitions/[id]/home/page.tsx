import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import "dayjs/locale/ko";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { CompetitionType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";
import ManagerContextSubscriber from "@/app/competitions/[id]/_components/ManagerContextSubscriber";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + `/competitions/${params.id}/`, {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    redirect(`/preview/competitions/${params.id}/`);
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
          <ProfileCircle profile={competition.creator.profile} size={12} />
          <div className={"flex flex-col"}>
            <span className={"truncate font-medium"}>
              {competition.creator_nickname}
            </span>
            <span className={"text-xs truncate"}>
              ID: {competition.creator.profile.username}
            </span>
          </div>
        </div>
        <span className={"text-sm justify-self-end self-end"}>
          {dayjs(competition.created_at)
            .locale("ko")
            .format("YY년 MMM DD일(dd)")}
        </span>
      </div>
      <div className={"overflow-x-auto"}>
        <table className={"table"}>
          <thead>
            <tr>
              <th colSpan={2}>참가자 목록</th>
            </tr>
          </thead>
          <tbody>
            {competition.participants.length == 0 ? (
              <tr>
                <td colSpan={2}>참가자가 없습니다.</td>
              </tr>
            ) : (
              competition.participants.map((v, i) => (
                <tr key={v.id}>
                  <td>{v.order}</td>
                  <td>
                    {v.account ? (
                      <div className={"flex items-center gap-3"}>
                        <ProfileCircle profile={v.account.profile} />
                        <div className={"font-bold"}>
                          {v.account.profile.username}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className={"unauthenticated-badge"}>비회원</div>
                        <span>{v.displayed_name}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ManagerContextSubscriber isManager={competition.is_manager} />
    </div>
  );
}
