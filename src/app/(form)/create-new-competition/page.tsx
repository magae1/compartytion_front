import React from "react";

import CompetitionForm from "@/app/(form)/create-new-competition/_components/CompetitionForm";

export default function Page() {
  return (
    <>
      <h1 className={"form-header"}>새 대회 만들기</h1>
      <CompetitionForm />
    </>
  );
}
