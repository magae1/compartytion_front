import { cookies } from "next/headers";
import {
  Box,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import _ from "underscore";

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
    <Container
      maxWidth={"md"}
      sx={{
        ".MuiTypography-root": {
          textAlign: "start",
        },
      }}
    >
      <Box py={5}>
        <Typography variant={"h4"} my={1}>
          설정
        </Typography>
        <Typography>
          ID: <span>{accountData.id}</span>
        </Typography>
      </Box>
      <Stack spacing={3}>
        <ProfileSettings profile={accountData.profile} />
        <AccountSettings account={accountData} />
      </Stack>
    </Container>
  );
}

function ProfileSettings({ profile }: { profile: ProfileType }) {
  return (
    <Paper elevation={0}>
      <Box px={2} py={3}>
        <Typography variant={"h5"}>프로필</Typography>
        <Typography variant={"body2"}>
          다른 사람이 볼 수 있는 정보입니다.
        </Typography>
      </Box>
      <Divider />
      <ListItemButton>
        <Box flexGrow={1}>
          <Box display={"flex"} flexWrap={"wrap"} my={1} gap={3}>
            <Box>
              <ProfileAvatar
                sx={{ height: 200, width: 200 }}
                avatar_url={profile.avatar}
                account={profile.account}
              />
            </Box>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Box>
                <Typography>공개 이름</Typography>
                <Typography>{profile.displayed_name}</Typography>
              </Box>
              <Box>
                <Typography>숨긴 이름</Typography>
                <Typography>{profile.hidden_name}</Typography>
              </Box>
              <Box>
                <Typography>내 소개</Typography>
                <Typography>{profile.introduction}</Typography>
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
  const email =
    account.email.slice(0, 2) +
    _.range(2, idx)
      .map(() => "*")
      .join("") +
    account.email.slice(idx, account.email.length);
  return (
    <Paper elevation={0}>
      <Box px={2} py={3}>
        <Typography variant={"h5"}>계정</Typography>
      </Box>
      <Divider />
      <List disablePadding>
        <ListItemButton>
          <ListItemText
            primary={"사용자명 변경"}
            secondary={account.username}
          />
          <ArrowForwardIos />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemText primary={"이메일 변경"} secondary={email} />
          <ArrowForwardIos />
        </ListItemButton>
        <Divider />
        <ListItemButton>
          <ListItemText primary={"비밀번호 변경"} />
          <ArrowForwardIos />
        </ListItemButton>
      </List>
    </Paper>
  );
}
