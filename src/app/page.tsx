import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Link as MuiLink,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
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
            href={"/auth"}
            variant={"contained"}
            endIcon={<ArrowForwardIos />}
          >
            로그인
          </Button>
        </Toolbar>
      </HomeAppBar>
      <Container component={"main"} maxWidth={false}>
        <Toolbar />
        <Box height={1666}>123</Box>
        <Box mb={6}>
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
          </Typography>
        </Box>
      </Container>
    </>
  );
}
