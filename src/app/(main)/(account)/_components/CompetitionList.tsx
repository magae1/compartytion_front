import Link from "next/link";
import { cookies } from "next/headers";
import {
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import { BASE_URL, COOKIE_ACCESS, DEFAULT_HEADERS } from "@/constants";
import { CompetitionSimpleType } from "@/types";
import ProfileAvatar from "@/components/ProfileAvatar";

interface ItemProps {
  competitionData: CompetitionSimpleType;
  index: number;
}

export default async function CompetitionList() {
  const accessToken = cookies().get(COOKIE_ACCESS)?.value;
  const data: CompetitionSimpleType[] = await fetch(
    BASE_URL + "/competitions/me/",
    {
      headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${accessToken}` },
    },
  ).then((res) => res.json());

  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Typography variant={"caption"}>대회를 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <List disablePadding>
      {data.map((v, i) => (
        <CompetitionItem key={v.id} index={i} competitionData={v} />
      ))}
    </List>
  );
}

function CompetitionItem(props: ItemProps) {
  const { competitionData, index } = props;

  return (
    <ListItem
      disablePadding
      sx={{
        backgroundColor: index % 2 == 1 ? "background.default" : undefined,
      }}
    >
      <ListItemButton
        sx={{ borderRadius: 1 }}
        component={Link}
        href={`/competitions/${competitionData.id}`}
      >
        <Grid container alignItems={"center"} spacing={1}>
          <Grid item xs>
            <Stack>
              <Typography noWrap variant={"subtitle1"}>
                {competitionData.title}
              </Typography>
              <Typography noWrap variant={"body2"} color={"text.secondary"}>
                {competitionData.introduction}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={2} lg={1}>
            <Chip size={"small"} label={competitionData.status} />
          </Grid>
          <Grid item xs={3} md={2}>
            <Chip
              avatar={
                <ProfileAvatar
                  avatar_url={competitionData.creator.avatar}
                  account={competitionData.creator.account}
                />
              }
              variant={"outlined"}
              label={competitionData.creator.account}
            />
          </Grid>
          <Grid item xs={2}>
            <Typography variant={"caption"}>
              {dayjs(competitionData.created_at).locale("ko").fromNow()}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
}
