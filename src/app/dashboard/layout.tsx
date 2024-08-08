import { ReactNode } from "react";
import { Container } from "@mui/material";

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  return <Container maxWidth={"lg"}>{children}</Container>;
}
