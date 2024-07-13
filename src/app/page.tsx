import Link from "next/link";

import { Box, Button } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Button component={Link} href={"/login"}>
        로그인
      </Button>
      <Button component={Link} href={"/signup"}>
        회원가입
      </Button>
    </Box>
  );
}
