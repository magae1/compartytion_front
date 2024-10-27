import { redirect } from "next/navigation";

import SignUpForm from "@/app/auth/_components/SignUpForm";
import { signUpSchema } from "@/schemas";
import { BASE_URL, DEFAULT_HEADERS } from "@/constants";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  let email: string = "";
  if (typeof searchParams.email === "string") {
    email = searchParams.email;
  }

  async function signUp(prevState: any, formData: FormData) {
    "use server";
    const validatedFormData = signUpSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirm: formData.get("confirm"),
      username: formData.get("username"),
    });

    if (!validatedFormData.success) {
      return validatedFormData.error.flatten().fieldErrors;
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
      return data;
    }
    redirect(`/auth/login?email=${data.email}&signed_up=${true}`);
  }

  return <SignUpForm email={email} action={signUp} />;
}
