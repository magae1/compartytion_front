import { Box } from "@mui/material";

import EmailForm from "@/app/(account)/settings/_components/EmailForm";

export default function Page() {
  return (
    <Box maxWidth={360} width={"100%"}>
      <EmailForm />
    </Box>
  );
}
