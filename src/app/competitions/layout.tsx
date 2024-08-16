import { ReactNode } from "react";
import { Container, Toolbar } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Toolbar />
      {children}
    </Container>
  );
}
