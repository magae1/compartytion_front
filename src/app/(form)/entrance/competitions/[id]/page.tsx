import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import CompetitionDetailsButton from "@/app/(form)/_components/CompetitionDetailsButton";
import { getCompetitionData } from "@/app/actions";
import CompetitionEntranceForm from "@/app/(form)/_components/CompetitionEntranceForm";
import { ActionResType } from "@/types";
import { CompetitionEntranceType, competitionEntranceSchema } from "@/schemas";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { id } = await props.params;

  const competition = await getCompetitionData(id);

  if (!competition) {
    notFound();
  }

  async function enterCompetition(
    prevState: any,
    formData: FormData,
  ): Promise<ActionResType<CompetitionEntranceType, any>> {
    "use server";
    const cookieStore = await cookies();
    formData.append("competition", id);
    const value = Object.fromEntries(formData) as CompetitionEntranceType;

    const validatedFormData = competitionEntranceSchema.safeParse(value);

    if (!validatedFormData.success) {
      return {
        value: value,
        message: validatedFormData.error.flatten().fieldErrors,
        isError: true,
      };
    }

    const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
    const res = await fetch(BASE_URL + "/applicants/check/", {
      method: "POST",
      headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return { value: value, message: data, isError: true };
    }

    redirect(`/competitions/${id}/home`);
  }

  return (
    <>
      <h1 className={"form-header"}>
        <span className={"block mb-1"}>어서오세요!</span>
        <CompetitionDetailsButton
          competition={competition}
          containerId={"competition_details"}
        />
        에 입장하기
      </h1>
      <div id={"competition_details"} />
      <CompetitionEntranceForm action={enterCompetition} />
      <p className={"text-sm text-slate-500 text-center mt-2"}>
        대회 참가자가 아닌가요?
        <Link
          className={"text-accent ml-2 hover:underline"}
          href={`/enroll/competitions/${id}`}
        >
          참가 신청하러 가기
        </Link>
      </p>
    </>
  );
}
