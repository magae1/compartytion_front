import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import LogInForm from "@/app/auth/_components/LogInForm";
import { logInSchema } from "@/schemas";
import {
  BASE_URL,
  COOKIE_ACCESS,
  COOKIE_IS_AUTH,
  COOKIE_REFRESH,
  DEFAULT_HEADERS,
} from "@/constants";

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;
  const signed_up = searchParams?.signed_up;

  async function logIn(prevStat: any, formData: FormData) {
    ("use server");
    const validatedFormData = logInSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFormData.success) {
      return validatedFormData.error.flatten().fieldErrors;
    }

    const res = await fetch(BASE_URL + "/auth/login/", {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(validatedFormData.data),
    });

    const data = await res.json();
    if (!res.ok) {
      return { password: ["비밀번호를 확인해주세요."] };
    }

    // TODO: httpOnly -> true, secure -> true
    cookies().set(COOKIE_ACCESS, data.access, {
      httpOnly: false,
      secure: false,
      expires: (jwtDecode(data.access).exp ?? 0) * 1000,
    });
    const refreshExp = (jwtDecode(data.refresh).exp ?? 0) * 1000;
    // TODO: httpOnly -> true, secure -> true
    cookies().set(COOKIE_REFRESH, data.refresh, {
      httpOnly: false,
      secure: false,
      path: "/api",
      expires: refreshExp,
    });
    cookies().set(COOKIE_IS_AUTH, "true", { expires: refreshExp });
    redirect("/dashboard");
  }

  return (
    <div className={"grow"}>
      <LogInForm email={email} action={logIn} />
    </div>
  );
}
