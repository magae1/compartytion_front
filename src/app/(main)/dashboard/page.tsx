import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { SimpleCompetitionType } from "@/types";

export default async function Page() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/competitions/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    redirect("/auth");
  }
  const competitionData: SimpleCompetitionType[] = await res.json();

  return (
    <div className={"px-5 pt-5 grid grid-cols-3 gap-3"}>
      <div className={"col-span-full"}>
        <div className={"flex flex-col *:mb-4"}>
          {competitionData.map((c: SimpleCompetitionType, index: number) => {
            return (
              <Link key={c.id} href={`/competitions/${c.id}`} className={"btn"}>
                {c.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
