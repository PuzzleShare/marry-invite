"use client";
import * as React from "react";
import apiClient from "@/lib/axios";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";
import { useUser } from "@/api/users";
import { Login } from "@/components";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

import {
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    const setUserData = async () => {
      if (!user) {
        const userData = await useUser();
        setUser(userData);
      }
    };
    setUserData();
  }, []);

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Marry Invite
          </Typography>
          {user ? (
            <div>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1 },
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    router.push("/mypage");
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Mypage
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    try {
                      await apiClient.post("/api/logout");
                      setUser(null);
                      handleMenuClose();
                      router.push("/");
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button onClick={() => setLoginOpen(true)} color="default">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </React.Fragment>
  );
}
