import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import LogInForm from "@/app/auth/_components/LogInForm";
import { logInSchema, LogInType } from "@/schemas";
import {
  BASE_URL,
  COOKIE_ACCESS,
  COOKIE_IS_AUTH,
  COOKIE_REFRESH,
  DEFAULT_HEADERS,
} from "@/constants";
import { ActionResType } from "@/types";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const email = searchParams.email;

  async function logIn(
    prevStat: any,
    formData: FormData,
  ): Promise<ActionResType<LogInType, any>> {
    "use server";
    const value = Object.fromEntries(formData) as LogInType;
    const validatedFormData = logInSchema.safeParse(value);

    if (!validatedFormData.success) {
      return {
        value: value,
        message: validatedFormData.error.flatten().fieldErrors,
        isError: true,
      };
    }

    const res = await fetch(BASE_URL + "/auth/login/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        value: value,
        message: { password: ["비밀번호를 확인해주세요."] },
        isError: true,
      };
    }

    // TODO: httpOnly -> true, secure -> true
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_ACCESS, data.access, {
      httpOnly: false,
      secure: false,
      expires: (jwtDecode(data.access).exp ?? 0) * 1000,
    });
    const refreshExp = (jwtDecode(data.refresh).exp ?? 0) * 1000;
    // TODO: httpOnly -> true, secure -> true
    cookieStore.set(COOKIE_REFRESH, data.refresh, {
      httpOnly: false,
      secure: false,
      path: "/api",
      expires: refreshExp,
    });
    cookieStore.set(COOKIE_IS_AUTH, "true", { expires: refreshExp });
    redirect("/dashboard");
  }

  return (
    <div className={"grow"}>
      <LogInForm
        email={typeof email !== "string" ? undefined : email}
        action={logIn}
      />
    </div>
  );
}
