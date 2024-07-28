import { ReactNode } from "react";
import { Box } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box flexGrow={1} display={"flex"} justifyContent={"center"} pt={3}>
      {children}
    </Box>
  );
}
