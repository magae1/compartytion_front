import { Alert, Box } from "@mui/material";

import LogInForm from "@/app/auth/_components/LogInForm";

interface Props {
  searchParams?: { [key: string]: string };
}

export default function Page(props: Props) {
  const { searchParams } = props;
  const email = searchParams?.email;
  const signed_up = searchParams?.signed_up;

  return (
    <Box flexGrow={1}>
      <LogInForm email={email} />
      {signed_up && (
        <Alert sx={{ marginTop: 1 }}>회원가입에 성공했습니다!</Alert>
      )}
    </Box>
  );
}
