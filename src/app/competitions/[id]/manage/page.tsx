import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

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
  { url: "participants", name: "참가자 관리" },
  // { url: "teams", name: "참가 팀 관리" },
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
          <ParticipantTable competitionId={id} />
        ) : idx == 1 ? (
          <ApplicantTable competitionId={id} />
        ) : idx == 2 ? (
          <>
            <div className={"my-3"}>
              <AddManagerModal />
            </div>
            <ManagerTable competitionId={id} deleteManager={deleteManager} />
          </>
        ) : null}
      </Suspense>
    </div>
  );
}
