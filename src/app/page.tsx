import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Stack,
  Toolbar,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import dayjs from "dayjs";

import { DefaultAppBar } from "@/components/styles";

export default function Page() {
  return (
    <>
      <DefaultAppBar>
        <Toolbar>
          <Link href={"/"} style={{ color: "inherit" }}>
            <Typography sx={{ ml: 1, fontWeight: 700 }}>
              Compartytion
            </Typography>
          </Link>
          <Button component={Link} variant={"outlined"} href={"/auth"}>
            로그인하러 가기
          </Button>
        </Toolbar>
      </DefaultAppBar>
      <Box>
        <Toolbar />
        <Stack>
          <Box height={1666}>123</Box>
          <Box>
            <Typography
              variant={"body2"}
              color={"text.secondary"}
              align={"center"}
              my={2}
            >
              {"Copyright © "}
              <MuiLink component={Link} color={"inherit"} href={"/"}>
                컴파티션
              </MuiLink>{" "}
              {dayjs().year()}
              {"."}
              {dayjs().month() + 1}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
