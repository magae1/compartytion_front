import { Suspense } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { AccountType, SimpleCompetitionType } from "@/types";
import CompetitionApplicationForm from "@/app/(form)/_components/CompetitionApplicationForm";
import CompetitionDetailsButton from "@/app/(form)/_components/CompetitionDetailsButton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function getCompetitionData(
  competitionId: string
): Promise<SimpleCompetitionType | null> {
  const res = await fetch(BASE_URL + `/competitions/${competitionId}/preview`, {
    headers: {
      ...DEFAULT_HEADERS,
    },
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

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

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  if (typeof searchParams.competition_id !== "string") {
    notFound();
  }

  const [competition, account] = await Promise.all([
    getCompetitionData(searchParams.competition_id),
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
      <CompetitionApplicationForm
        competitionId={competition.id}
        account={account}
      />
    </>
  );
}
