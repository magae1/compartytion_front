"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { authSchema, logInSchema, otpSchema, signUpSchema } from "@/schemas";
import {
  BASE_URL,
  COOKIE_ACCESS,
  COOKIE_IS_AUTH,
  COOKIE_REFRESH,
  DEFAULT_HEADERS,
} from "@/constants";

export async function checkEmail(prevState: any, formData: FormData) {
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

export async function logIn(prevStat: any, formData: FormData) {
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

  cookies().set(COOKIE_ACCESS, data.access, {
    httpOnly: true,
    secure: true,
    expires: (jwtDecode(data.access).exp ?? 0) * 1000,
  });
  const refreshExp = (jwtDecode(data.refresh).exp ?? 0) * 1000;
  cookies().set(COOKIE_REFRESH, data.refresh, {
    httpOnly: true,
    secure: true,
    path: "/api",
    expires: refreshExp,
  });
  cookies().set(COOKIE_IS_AUTH, "true", { expires: refreshExp });
  redirect("/dashboard");
}

export async function verifyOTP(prevState: any, formData: FormData) {
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

export async function sendOTP(prevState: any, formData: FormData) {
  const validatedFormData = authSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFormData.success) {
    return validatedFormData.error.flatten().fieldErrors;
  }

  const res = await fetch(BASE_URL + "/auth/request_otp/", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(validatedFormData.data),
  });

  const data = await res.json();
  if (!res.ok) {
    return data;
  }

  return {
    remaining_time: data.remaining_time,
  };
}

export async function signUp(prevState: any, formData: FormData) {
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

export async function getProfile() {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;

  if (!accessToken) {
    return {
      account: "",
      avatar: null,
      introduction: null,
    };
  }

  const res = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return {
      account: "",
      avatar: null,
      introduction: null,
    };
  }
  return await res.json();
}