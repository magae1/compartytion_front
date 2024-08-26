import React from "react";
import { redirect } from "next/navigation";

import EmailForm from "@/app/auth/_components/EmailForm";
import SocialAuth from "@/app/auth/_components/SocialAuth";
import { authSchema } from "@/schemas";
import { BASE_URL, DEFAULT_HEADERS } from "@/constants";

export default function Page() {
  async function checkEmail(prevState: any, formData: FormData) {
    "use server";
    const validatedFormData = authSchema.safeParse({
      email: formData.get("email"),
    });

    if (!validatedFormData.success) {
      return validatedFormData.error.flatten().fieldErrors;
    }

    const res = await fetch(BASE_URL + "/auth/check_email/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return data;
    }

    if (data.exists) {
      redirect(`/auth/login?email=${data.email}`);
    } else {
      redirect(`/auth/otp?email=${data.email}`);
    }
  }

  return (
    <div className={"flex w-full flex-col gap-3"}>
      <SocialAuth />
      <div className={"divider text-xs"}>또는</div>
      <EmailForm action={checkEmail} />
    </div>
  );
}
