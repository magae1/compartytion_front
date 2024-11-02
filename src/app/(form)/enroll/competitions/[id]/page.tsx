import { Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { AccountType } from "@/types";
import CompetitionApplicationForm from "@/app/(form)/_components/CompetitionApplicationForm";
import CompetitionDetailsButton from "@/app/(form)/_components/CompetitionDetailsButton";
import { getCompetitionData } from "@/app/actions";

type Params = Promise<{ id: string }>;

async function getAccountData(): Promise<AccountType | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/me", {
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;

  const [competition, account] = await Promise.all([
    getCompetitionData(id),
    getAccountData(),
  ]);

  if (!competition) {
    notFound();
  }

  return (
    <>
      <h1 className={"form-header"}>
        <Suspense fallback={<div className={"skeleton h-12 w-20"} />}>
          <CompetitionDetailsButton
            competition={competition}
            containerId={"competition_details"}
          />
        </Suspense>
        에 참가하기
      </h1>
      <div id={"competition_details"} />
      <CompetitionApplicationForm competitionId={id} account={account} />
      <p className={"text-sm text-slate-500 text-center mt-2"}>
        이미 대회 참가 중인가요?
        <Link
          className={"text-accent ml-2 hover:underline"}
          href={`/entrance/competitions/${id}`}
        >
          대회 입장하기
        </Link>
      </p>
    </>
  );
}
