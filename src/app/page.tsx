import React from "react";
import Link from "next/link";
import {
  Box,
  Stack,
  Typography,
  Link as MuiLink,
  Toolbar,
  Container,
} from "@mui/material";
import dayjs from "dayjs";

export default function Page() {
  return (
    <Container maxWidth={false}>
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
    </Container>
  );
}
