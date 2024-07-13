import { ReactNode } from "react";
import { Container } from "@mui/material";

export default function Layout({ children }: { children: ReactNode }) {
  return <Container maxWidth={"md"}>{children}</Container>;
}
