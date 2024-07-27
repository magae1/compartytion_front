"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { Close, Dashboard, Logout, Settings } from "@mui/icons-material";

import { ProfileType } from "@/types";
import { getProfile } from "@/app/actions";
import ProfileAvatar from "@/components/ProfileAvatar";

const initialState: ProfileType = {
  account: "",
  avatar: null,
  introduction: null,
  hidden_name: null,
  displayed_name: null,
};

export default function AccountDrawer() {
  const router = useRouter();
  const mounted = useRef(false);
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(initialState);

  const closeDrawer = useCallback(() => setOpen(false), []);
  const openDrawer = useCallback(() => setOpen(true), []);

  const logOut = useCallback(async () => {
    await fetch("/api/logout/", { method: "POST" });
    router.refresh();
  }, []);

  const listItems = useMemo(
    () => (
      <>
        <ListItemButton component={Link} href={"/dashboard"}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={"대시보드"} />
        </ListItemButton>
        <ListItemButton component={Link} href={"/settings"}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={"설정"} />
        </ListItemButton>
        <ListItemButton onClick={logOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary={"로그아웃"} />
        </ListItemButton>
        <Divider />
        <ListSubheader>테마</ListSubheader>
        <ListItem>
          <ThemeSwitch />
        </ListItem>
      </>
    ),
    [],
  );

  useEffect(() => {
    if (mounted.current) {
      const initProfile = async () => {
        setProfile(await getProfile());
      };
      initProfile().then();
    } else {
      mounted.current = true;
    }
  }, []);

  return (
    <>
      <ButtonBase sx={{ borderRadius: "100%" }} onClick={openDrawer}>
        <ProfileAvatar avatar_url={profile.avatar} account={profile.account} />
      </ButtonBase>
      <Drawer anchor={"right"} open={open} onClose={closeDrawer}>
        <Box
          width={"320px"}
          height={"100%"}
          sx={{ bgcolor: "background.paper" }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography>내 정보</Typography>
            <IconButton onClick={closeDrawer}>
              <Close />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem sx={{ gap: 2 }}>
              <ListItemAvatar>
                <ProfileAvatar
                  sx={{ height: 56, width: 56 }}
                  avatar_url={profile.avatar}
                  account={profile.account}
                />
              </ListItemAvatar>
              <ListItemText primary={profile.account} />
            </ListItem>
          </List>
          <List
            onClick={closeDrawer}
            disablePadding
            sx={{
              "& .MuiListItemButton-root": {
                borderRadius: 2,
              },
            }}
          >
            {listItems}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

function ThemeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ButtonGroup
      fullWidth
      sx={{
        [`#${mode}-theme-button`]: {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      <Button onClick={() => setMode("light")} id={"light-theme-button"}>
        밝게
      </Button>
      <Button onClick={() => setMode("system")} id={"system-theme-button"}>
        시스템
      </Button>
      <Button onClick={() => setMode("dark")} id={"dark-theme-button"}>
        어둡게
      </Button>
    </ButtonGroup>
  );
}
