import { Box, Button, Stack, Typography } from "@mui/material";

export default function SocialAuth() {
  //TODO: 소셜 로그인 추가(백 구현 이후)
  return (
    <Stack spacing={2}>
      <Button variant={"outlined"}>구글</Button>
      <Button variant={"outlined"}>네이버</Button>
    </Stack>
  );
}
