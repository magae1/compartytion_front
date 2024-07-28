"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { authSchema, changePasswordSchema, otpSchema } from "@/schemas";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

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

  return { remaining_time: data.remaining_time };
}

export async function changeProfile(prevStat: any, formData: FormData) {
  const file = formData.get("avatar") as File | null;
  if (!file || !file.name || file.size == 0) {
    formData.delete("avatar");
  }

  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/profiles/me/", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    return { ...prevStat, ...data };
  }

  revalidatePath("/", "layout");
  return { ...prevStat, success: true, ...data };
}

export async function changePassword(prevStat: any, formData: FormData) {
  const validatedFormData = changePasswordSchema.safeParse({
    password: formData.get("password"),
    new_password: formData.get("new_password"),
    new_password_confirmation: formData.get("new_password_confirmation"),
  });

  if (!validatedFormData.success) {
    return validatedFormData.error.flatten().fieldErrors;
  }

  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/change_password/", {
    method: "PATCH",
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({
      password: validatedFormData.data.password,
      new_password: validatedFormData.data.new_password,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { ...prevStat, ...data };
  }

  revalidatePath("/settings", "page");
  return { ...prevStat, success: true, ...data };
}

export async function changeUsername(prevStat: any, formData: FormData) {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/change_username/", {
    method: "PATCH",
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ username: formData.get("username") }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { ...prevStat, ...data };
  }

  revalidatePath("/settings", "page");
  return { ...prevStat, success: true, ...data };
}

export async function changeEmail(prevStat: any, formData: FormData) {
  const validatedFormData = otpSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!validatedFormData.success) {
    return validatedFormData.error.flatten().fieldErrors;
  }

  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/change_email/", {
    method: "PATCH",
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(validatedFormData.data),
  });

  const data = await res.json();
  if (!res.ok) {
    return { ...prevStat, ...data };
  }

  revalidatePath("/settings", "page");
  return { ...prevStat, success: true, ...data };
}
