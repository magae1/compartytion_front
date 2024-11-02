import { redirect } from "next/navigation";

import OTPForm from "@/app/auth/_components/OTPForm";
import { otpSchema, OTPType } from "@/schemas";
import { BASE_URL, DEFAULT_HEADERS } from "@/constants";
import { ActionResType } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  let email: string = "";
  if (typeof searchParams.email === "string") {
    email = searchParams.email;
  }

  async function verifyOTP(
    prevState: any,
    formData: FormData,
  ): Promise<ActionResType<OTPType, any>> {
    "use server";
    const value = Object.fromEntries(formData) as OTPType;
    const validatedFormData = otpSchema.safeParse(value);

    if (!validatedFormData.success) {
      return {
        value: value,
        message: validatedFormData.error.flatten().fieldErrors,
        isError: true,
      };
    }

    const res = await fetch(BASE_URL + "/auth/verify_otp/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return { value: value, message: data, isError: true };
    }
    redirect(`/auth/signup?email=${data.email}`);
  }

  return <OTPForm email={email} verifyOTPAction={verifyOTP} />;
}
