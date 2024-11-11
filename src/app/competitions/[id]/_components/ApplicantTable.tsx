import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { ApplicantType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";
import { cookies } from "next/headers";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

const tableHeaders = ["", "프로필", "공개 이름", "비공개 이름", "신청일", ""];

interface Props {
  competitionId: string;
}

export default async function ApplicantTable(props: Props) {
  const { competitionId } = props;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS);

  const res = await fetch(
    BASE_URL + `/competitions/${competitionId}/applicants/`,
    {
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${accessToken?.value}`,
      },
      next: { tags: ["applicants"] },
    },
  );

  if (!res.ok) {
    return (
      <div>
        <p className={"my-10 text-center"}>알 수 없는 오류가 발생했습니다.</p>
      </div>
    );
  }

  const applicants: ApplicantType[] = await res.json();

  return (
    <div className={"overflow-x-auto"}>
      <table className={"table"}>
        <thead>
          <tr>
            {tableHeaders.map((v, i) => (
              <th key={i}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {applicants.length == 0 ? (
            <tr>
              <td colSpan={tableHeaders.length}>
                <p className={"text-center my-10"}>신청자가 없습니다.</p>
              </td>
            </tr>
          ) : (
            applicants.map((v, i) => (
              <tr key={v.id}>
                <td>{i + 1}</td>
                <td>
                  {v.account ? (
                    <div className={"flex items-center gap-3"}>
                      <ProfileCircle profile={v.account.profile} />
                      <div className={"hidden sm:block"}>
                        <div className={"font-bold"}>
                          {v.account.profile.username}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={"unauthenticated-badge"}>비회원</div>
                  )}
                </td>
                <td>{v.displayed_name}</td>
                <td>{v.hidden_name}</td>
                <td>{dayjs(v.applied_at).locale("ko").fromNow()}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
