import { Box, Typography } from "@mui/material";

import UsernameForm from "@/app/settings/_components/UsernameForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <Typography variant={"h4"} my={1}>
        내 시용자명 변경
      </Typography>
      <UsernameForm />
    </Box>
  );
}
