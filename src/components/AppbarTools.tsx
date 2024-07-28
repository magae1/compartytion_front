import { cookies } from "next/headers";
import Link from "next/link";
import { Button, Stack } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { ProfileType } from "@/types";
import AccountDrawer from "@/components/AccountDrawer";

export default async function AppbarTools() {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  if (!accessToken) {
    return <LoginButton />;
  }

  const res = await fetch(BASE_URL + "/profiles/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return <LoginButton />;
  }

  const data: ProfileType = await res.json();
  return (
    <Stack direction={"column"} spacing={2}>
      <AccountDrawer profileData={data} />
    </Stack>
  );
}

function LoginButton() {
  return (
    <Button
      component={Link}
      href={"/auth"}
      variant={"contained"}
      endIcon={<ArrowForwardIos />}
    >
      로그인
    </Button>
  );
}