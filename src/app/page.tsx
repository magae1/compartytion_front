import React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Toolbar,
  Typography,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import dayjs from "dayjs";

import HomeAppBar from "@/components/HomeAppBar";

export default function Page() {
  return (
    <>
      <HomeAppBar>
        <Toolbar>
          <Link href={"/"} style={{ color: "inherit" }}>
            <Typography sx={{ fontWeight: 600 }}>Compartytion</Typography>
          </Link>
          <Button
            component={Link}
            variant={"outlined"}
            href={"/auth"}
            endIcon={<ArrowForward />}
          >
            로그인
          </Button>
        </Toolbar>
      </HomeAppBar>
      <Box component={"main"}>
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
