import React, { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import { MdArrowForward } from "react-icons/md";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import ApplicantTable from "@/app/competitions/[id]/_components/ApplicantTable";
import ManagerTable from "@/app/competitions/[id]/_components/ManagerTable";
import AddManagerModal from "@/app/competitions/[id]/_components/AddManagerModal";
import ParticipantTable from "@/app/competitions/[id]/_components/ParticipantTable";

type TabType = {
  url: string;
  name: string;
};
const tabList: TabType[] = [
  { url: "default", name: "대회 설정" },
  { url: "participants", name: "참가자 관리" },
  { url: "applicants", name: "신청자 관리" },
  { url: "managers", name: "관리자 관리" },
];

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  const tabName = searchParams.tab;

  let idx = -1;
  if (typeof tabName === "string") {
    idx = tabList.findIndex((v) => v.url === tabName);
  } else if (typeof tabName === "undefined") {
    idx = 0;
  }
  if (idx < 0) {
    notFound();
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/accounts/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  async function deleteManager(formData: FormData) {
    "use server";
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
    const res = await fetch(
      BASE_URL + `/competitions/${id}/managers/${formData.get("manager_id")}/`,
      {
        method: "DELETE",
        headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
      },
    );
    revalidateTag("managers");
  }

  return (
    <div className={"px-5 pt-5"}>
      <div role={"tablist"} className={"tabs tabs-boxed"}>
        {tabList.map((v, i) => (
          <Link
            key={v.url}
            href={{ query: { tab: v.url } }}
            role={"tab"}
            className={`tab ${i == idx ? "tab-active" : null}`}
          >
            {v.name}
          </Link>
        ))}
      </div>
      <Suspense
        fallback={
          <div className={"w-full flex justify-center py-12"}>
            <span className={"loading loading-bars loading-md"}></span>
          </div>
        }
      >
        {idx == 0 ? (
          <div className={"pt-3"}>
            <div>
              <h2 className={"text-xl font-semibold pb-3"}>대회 규칙</h2>
              <p className={"text-sm text-base-content"}>
                대회 규칙을 설정합니다. 변동 사항은 기록됩니다.
              </p>
            </div>
            <div className={"divider"}></div>
            <div>
              <h2 className={"text-xl font-semibold pb-3"}>대회 내용</h2>
              <div className={"flex"}>
                <div className={"flex-1"}>
                  <p className={"text-sm text-base-content"}>
                    참가자들이 볼 수 있는 대회 내용을 설정합니다.
                  </p>
                </div>
                <div className={"flex-none"}>
                  <Link
                    href={`/competitions/${id}/manage/content`}
                    className={"btn btn-sm"}
                  >
                    편집하러 가기
                    <MdArrowForward />
                  </Link>
                </div>
              </div>
            </div>
            <div className={"divider"}></div>
          </div>
        ) : idx == 1 ? (
          <ParticipantTable competitionId={id} />
        ) : idx == 2 ? (
          <ApplicantTable competitionId={id} />
        ) : idx == 3 ? (
          <>
            <div className={"my-3"}>
              <AddManagerModal competition_id={id} />
            </div>
            <ManagerTable competitionId={id} deleteManager={deleteManager} />
          </>
        ) : null}
      </Suspense>
    </div>
  );
}
