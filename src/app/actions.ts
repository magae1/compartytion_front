"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

import {
  authSchema,
  changePasswordSchema,
  otpSchema,
  createCompetitionSchema,
  applyToCompetitionSchema,
  inviteManagerSchema,
  ApplicantType,
  ChangePasswordType,
  OTPType,
  CompetitionCreationType,
} from "@/schemas";
import { ActionResType, SimpleCompetitionType } from "@/types";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";

export async function sendOTP(
  prevState: any,
  formData: FormData,
): Promise<ActionResType<{ email: string; remaining_time?: number }, any>> {
  const value = Object.fromEntries(formData) as { email: string };
  const validatedFormData = authSchema.safeParse(value);

  if (!validatedFormData.success) {
    return {
      value: value,
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const res = await fetch(BASE_URL + "/auth/request_otp/", {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(validatedFormData.data),
  });

  const data = await res.json();
  if (!res.ok) {
    return { value: value, message: data, isError: true };
  }
  return { value: data, message: {}, isError: false };
}

export async function changePassword(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<ChangePasswordType, any>> {
  const value = Object.fromEntries(formData) as ChangePasswordType;
  const validatedFormData = changePasswordSchema.safeParse(value);

  if (!validatedFormData.success) {
    return {
      value: value,
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
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
    return { value: value, message: { ...prevStat, ...data }, isError: true };
  }

  return { value: value, message: { ...prevStat, ...data }, isError: false };
}

export async function changeEmail(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<OTPType, any>> {
  const value = Object.fromEntries(formData) as OTPType;
  const validatedFormData = otpSchema.safeParse(value);

  if (!validatedFormData.success) {
    return {
      value: value,
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/change_email/", {
    method: "PATCH",
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(validatedFormData.data),
  });

  const data = await res.json();
  if (!res.ok) {
    return {
      value: value,
      message: {
        ...prevStat,
        ...data,
      },
      isError: true,
    };
  }

  return { value: value, message: { ...prevStat, ...data }, isError: false };
}

export async function changeProfile(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<null, any>> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/accounts/change_profile/", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    return { value: null, isError: true, message: { ...data } };
  }

  revalidateTag("profile");
  return { value: null, isError: false, message: { ...data } };
}

export async function createCompetition(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<CompetitionCreationType, any>> {
  const title = formData.get("title") as string;
  const managers = formData.get("managers") as string;
  const introduction = formData.get("introduction") as string | undefined;
  const validatedFormData = createCompetitionSchema.safeParse({
    title: title ? title : null,
    introduction: introduction ? introduction : undefined,
    is_team_game: formData.get("is_team_game") === "on",
    managers: managers ? [...managers.split(",")] : [],
  });

  if (!validatedFormData.success) {
    return {
      value: {
        title: title,
        managers: [],
        introduction: introduction,
        is_team_game: formData.get("is_team_game") === "on",
      },
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/competitions/", {
    method: "POST",
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(validatedFormData.data),
  });

  const data = await res.json();
  if (!res.ok) {
    return {
      value: {
        title: title,
        managers: [],
        introduction: introduction,
        is_team_game: formData.get("is_team_game") === "on",
      },
      message: { ...prevStat, ...data },
      isError: true,
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function getProfile(username: string | null) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  if (!accessToken || !username || username === "") {
    return { success: false };
  }

  const res = await fetch(BASE_URL + `/profiles/${username}/`, {
    headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    return { success: false };
  }
  const data = await res.json();
  return await { success: true, ...data };
}

export async function applyToCompetition(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<ApplicantType, any>> {
  const value = Object.fromEntries(formData) as ApplicantType;
  const cookieStore = await cookies();
  const validatedFormData = applyToCompetitionSchema.safeParse(value);

  if (!validatedFormData.success) {
    return {
      value: value,
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(BASE_URL + "/applications/register/", {
    method: "POST",
    headers: accessToken
      ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` }
      : DEFAULT_HEADERS,
    body: JSON.stringify(validatedFormData.data),
  });

  if (!res.ok) {
    const data = await res.json();
    return { value: value, message: data, isError: true };
  }

  redirect(`/preview/competitions/${value.competition}/`);
}

export async function getCompetitionData(
  competitionId: string,
): Promise<SimpleCompetitionType | null> {
  const res = await fetch(BASE_URL + `/competitions/${competitionId}/preview`, {
    headers: DEFAULT_HEADERS,
  });

  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function inviteManagers(
  prevStat: any,
  formData: FormData,
): Promise<ActionResType<null, { usernames?: string[]; detail?: string }>> {
  const cookieStore = await cookies();
  const competition_id = formData.get("competition_id") as string;
  const usernames: string = formData.get("usernames") as string;

  const validatedFormData = inviteManagerSchema.safeParse({
    usernames: usernames ? [...usernames.split(",")] : [],
  });

  if (!validatedFormData.success) {
    return {
      value: null,
      message: validatedFormData.error.flatten().fieldErrors,
      isError: true,
    };
  }

  const accessToken = cookieStore.get(COOKIE_ACCESS)?.value;
  const res = await fetch(
    BASE_URL + `/competitions/${competition_id}/invite_managers/`,
    {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(validatedFormData.data),
    },
  );

  const data = await res.json();
  if (!res.ok) {
    return { value: null, message: data, isError: true };
  }
  revalidateTag("managers");
  return { value: null, message: data, isError: false };
}
