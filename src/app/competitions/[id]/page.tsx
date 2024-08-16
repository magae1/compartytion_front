import { Box, Typography } from "@mui/material";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Box>
      <Typography>{params.id}</Typography>
    </Box>
  );
}
