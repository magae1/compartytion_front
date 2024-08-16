import { cookies } from "next/headers";
import { Box } from "@mui/material";

import ProfileForm from "@/app/(account)/settings/_components/ProfileForm";
import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { ProfileType } from "@/types";

export default async function Page() {
  const accessToken = cookies().get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("데이터를 불러올 수 없습니다.");
  }
  const profileData: ProfileType = await res.json();

  return (
    <Box maxWidth={640} width={"100%"}>
      <ProfileForm profile={profileData} />
    </Box>
  );
}
