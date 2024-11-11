import { cookies } from "next/headers";
import { MdInfoOutline } from "react-icons/md";

import { ManagerType } from "@/types";
import ProfileCircle from "@/components/ProfileCircle";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

const tableHeaders = [
  "",
  "프로필",
  "공개 이름",
  "참가자 권한",
  "신청자 권한",
  "내용 편집 권한",
  "규칙 편집 권한",
  "",
];

interface Props {
  competitionId: string;
  deleteManager: (formData: FormData) => Promise<void>;
}

export default async function ManagerTable(props: Props) {
  const { competitionId, deleteManager } = props;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS);

  const res = await fetch(
    BASE_URL + `/competitions/${competitionId}/managers/`,
    {
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${accessToken?.value}`,
      },
      next: { tags: ["managers"] },
    },
  );

  if (!res.ok) {
    return (
      <div>
        <p className={"my-10 text-center"}>알 수 없는 오류가 발생했습니다.</p>
      </div>
    );
  }

  const managers: ManagerType[] = await res.json();
  const acceptedManagers = managers.filter((m) => m.accepted);
  const unAcceptedManagers = managers.filter((m) => !m.accepted);

  return (
    <>
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
            {acceptedManagers.length == 0 ? (
              <tr>
                <td colSpan={tableHeaders.length}>
                  <p className={"text-center my-10"}>매니저가 없습니다.</p>
                </td>
              </tr>
            ) : (
              acceptedManagers.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className={"flex items-center gap-3"}>
                      <ProfileCircle profile={v.account.profile} />
                      <div className={"hidden sm:block"}>
                        <div className={"font-bold"}>
                          {v.account.profile.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{v.nickname}</td>
                  <td>
                    <form action={deleteManager}>
                      <input hidden name={"manager_id"} value={v.id} />
                      <button className={"btn btn-outline btn-error btn-sm"}>
                        취소
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={"mt-5 mb-3 flex justify-between"}>
        <span className={"ml-3 text-sm"}>수락 대기 중</span>
        <span className={"ml-3 text-xs flex"}>
          <MdInfoOutline size={16} className={"mr-0.5"} />
          당사자가 대회 매니저 요청을 수락하지 않은 상태입니다.
        </span>
      </div>
      <div className={"overflow-x-auto"}>
        <table className={"table"}>
          <thead>
            <tr>
              {tableHeaders.slice(0, 3).map((h, i) => (
                <th key={i}>{h}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {unAcceptedManagers.length == 0 ? (
              <tr>
                <td colSpan={tableHeaders.length}>
                  <p className={"text-center my-10"}>
                    수락 대기 중인 매니저가 없습니다.
                  </p>
                </td>
              </tr>
            ) : (
              unAcceptedManagers.map((v, i) => (
                <tr key={v.id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className={"flex items-center gap-3"}>
                      <ProfileCircle profile={v.account.profile} />
                      <div className={"hidden sm:block"}>
                        <div className={"font-bold"}>
                          {v.account.profile.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{v.nickname}</td>
                  <td>
                    <form action={deleteManager}>
                      <input hidden name={"manager_id"} value={v.id} />
                      <button className={"btn btn-outline btn-error btn-sm"}>
                        취소
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
