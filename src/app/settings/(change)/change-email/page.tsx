import { Box, Typography } from "@mui/material";

import EmailForm from "@/app/settings/_components/EmailForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <Typography variant={"h4"} my={1}>
        내 이메일 변경
      </Typography>
      <EmailForm />
    </Box>
  );
}
