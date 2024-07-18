import React from "react";
import { Box, Link, Stack, Toolbar, Typography } from "@mui/material";
import dayjs from "dayjs";

import BorderLineOnScrollAppBar from "@/components/BorderLineOnScrollAppBar";

export default function Page() {
  return (
    <>
      <BorderLineOnScrollAppBar />
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
            <Link color="inherit" href="/">
              컴파티션
            </Link>{" "}
            {dayjs().year()}
            {"."}
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
