import { redirect } from "next/navigation";

import SignUpForm from "@/app/auth/_components/SignUpForm";
import { signUpSchema, SignupType } from "@/schemas";
import { BASE_URL, DEFAULT_HEADERS } from "@/constants";
import { ActionResType } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  let email: string = "";
  if (typeof searchParams.email === "string") {
    email = searchParams.email;
  }

  async function signUp(
    prevState: any,
    formData: FormData,
  ): Promise<ActionResType<SignupType, any>> {
    "use server";
    const value = Object.fromEntries(formData) as SignupType;
    const validatedFormData = signUpSchema.safeParse(value);

    if (!validatedFormData.success) {
      return {
        value: value,
        message: validatedFormData.error.flatten().fieldErrors,
        isError: true,
      };
    }

    const res = await fetch(BASE_URL + "/auth/signup/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({
        email: validatedFormData.data.email,
        password: validatedFormData.data.password,
        username: validatedFormData.data.username,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { value: value, message: data, isError: true };
    }
    redirect(`/auth/login?email=${data.email}&signed_up=${true}`);
  }

  return <SignUpForm email={email} action={signUp} />;
}
