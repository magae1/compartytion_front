import Link from "next/link";
import { Button, Stack } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

import { ProfileType } from "@/types";
import AccountDrawer from "@/components/AccountDrawer";

interface Props {
  profileData?: ProfileType;
}

export default async function AppbarTools({ profileData }: Props) {
  if (!profileData) {
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

  return (
    <Stack direction={"column"} spacing={2}>
      <AccountDrawer profileData={profileData} />
    </Stack>
  );
}
