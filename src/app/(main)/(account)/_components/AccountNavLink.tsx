"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ListItemButton } from "@mui/material";

interface Props {
  slug: string;
  children: ReactNode;
}

export default function AccountNavLink({ slug, children }: Props) {
  const segment = useSelectedLayoutSegment();
  const isActive = slug === segment;

  return (
    <ListItemButton
      component={Link}
      href={`/${slug}`}
      sx={(theme) => ({
        borderRight: `2px solid ${isActive ? theme.vars.palette.primary.main : undefined}`,
        "& .MuiSvgIcon-root": {
          color: isActive
            ? theme.vars.palette.primary.main
            : theme.vars.palette.text.primary,
        },
        "& .MuiTypography-root": {
          color: isActive
            ? theme.vars.palette.primary.main
            : theme.vars.palette.text.primary,
        },
      })}
    >
      {children}
    </ListItemButton>
  );
}
