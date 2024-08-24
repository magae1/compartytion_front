import { cookies } from "next/headers";
import Link from "next/link";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import ProfileAvatar from "@/components/ProfileAvatar";
import { AccountType, ProfileType } from "@/types";

export default async function Page() {
  const accessToken = cookies().get(COOKIE_ACCESS);
  const res = await fetch(BASE_URL + "/accounts/me/", {
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  if (!res.ok) {
    throw new Error("데이터를 불러올 수 없습니다.");
  }
  const accountData: AccountType = await res.json();

  return (
    <Stack spacing={3} mb={2} width={"100%"}>
      <ProfileSettings profile={accountData.profile} />
      <AccountSettings account={accountData} />
    </Stack>
  );
}

function ProfileSettings({ profile }: { profile: ProfileType }) {
  return (
    <Paper>
      <Box px={2} py={3}>
        <Typography variant={"h5"}>프로필</Typography>
        <Typography variant={"body2"}>
          다른 사람이 볼 수 있는 정보입니다. 대회 참가 시 필요한 정보도 설정할
          수 있습니다.
        </Typography>
      </Box>
      <Divider />
      <ListItemButton
        component={Link}
        href={"/settings/change-profile"}
        passHref
      >
        <Box flexGrow={1}>
          <Box display={"flex"} flexWrap={"wrap"} my={1} gap={3}>
            <Box>
              <ProfileAvatar
                sx={{ height: 200, width: 200 }}
                avatar_url={profile.avatar}
                account={profile.account}
              />
            </Box>
            <Stack
              spacing={2}
              sx={{
                flexGrow: 1,
                "& .MuiBox-root": {
                  minHeight: 45,
                },
              }}
            >
              <Box>
                <Typography variant={"subtitle2"} color={"text.secondary"}>
                  공개 이름
                </Typography>
                <Typography>{profile.displayed_name}</Typography>
              </Box>
              <Box>
                <Typography variant={"subtitle2"} color={"text.secondary"}>
                  비공개 이름
                </Typography>
                <Typography>{profile.hidden_name}</Typography>
              </Box>
              <Box>
                <Typography variant={"subtitle2"} color={"text.secondary"}>
                  소개
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {profile.introduction}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
        <ArrowForwardIos />
      </ListItemButton>
    </Paper>
  );
}

function AccountSettings({ account }: { account: AccountType }) {
  const idx = account.email.search(/@/g);
  const markedIdx = Math.floor(idx / 3);
  const email =
    account.email.slice(0, markedIdx) +
    "*".repeat(idx - markedIdx) +
    account.email.slice(idx, account.email.length);

  return (
    <Paper>
      <Box px={2} py={3}>
        <Typography variant={"h5"}>계정</Typography>
      </Box>
      <Divider />
      <List disablePadding>
        <ListItemButton
          component={Link}
          href={"/settings/change-username"}
          passHref
        >
          <ListItemText
            primary={"사용자명 변경"}
            secondary={account.username}
          />
          <ArrowForwardIos />
        </ListItemButton>
        <Divider />
        <ListItemButton
          component={Link}
          href={"/settings/change-email"}
          passHref
        >
          <ListItemText primary={"이메일 변경"} secondary={email} />
          <ArrowForwardIos />
        </ListItemButton>
        <Divider />
        <ListItemButton
          component={Link}
          href={"/settings/change-password"}
          passHref
        >
          <ListItemText
            primary={"비밀번호 변경"}
            secondary={dayjs(account.last_password_changed)
              .locale("ko")
              .fromNow()}
          />
          <ArrowForwardIos />
        </ListItemButton>
      </List>
    </Paper>
  );
}
