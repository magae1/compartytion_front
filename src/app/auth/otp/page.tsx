import { redirect } from "next/navigation";

import OTPForm from "@/app/auth/_components/OTPForm";
import { otpSchema } from "@/schemas";
import { BASE_URL, DEFAULT_HEADERS } from "@/constants";

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;

  async function verifyOTP(prevState: any, formData: FormData) {
    "use server";
    const validatedFormData = otpSchema.safeParse({
      email: formData.get("email"),
      otp: formData.get("otp"),
    });

    if (!validatedFormData.success) {
      return validatedFormData.error.flatten().fieldErrors;
    }

    const res = await fetch(BASE_URL + "/auth/verify_otp/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return data;
    }
    redirect(`/auth/signup?email=${data.email}`);
  }

  return <OTPForm email={email} action={verifyOTP} />;
}
