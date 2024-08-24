"use client";
import { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import { Breadcrumbs, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";

const paths = [
  { slug: "change-email", label: "내 이메일 변경하기" },
  { slug: "change-password", label: "내 비밀번호 변경하기" },
  { slug: "change-profile", label: "내 프로필 변경하기" },
  { slug: "change-username", label: "내 사용자명 변경하기" },
];

interface Props {
  links: { slug: string; label: string; icon: ReactNode }[];
}

export default function AccountBreadcrumbs({ links }: Props) {
  const segments = useSelectedLayoutSegments();

  if (segments.length === 0) {
    return null;
  }

  const link = links.find((l) => l.slug === segments[0]);
  const path = paths.find((p) => p.slug === segments[1]);

  return (
    <Breadcrumbs separator={<NavigateNext fontSize={"small"} />} sx={{ mb: 3 }}>
      {link && <Typography variant={"subhead"}>{link.label}</Typography>}
      {path && <Typography>{path.label}</Typography>}
    </Breadcrumbs>
  );
}
