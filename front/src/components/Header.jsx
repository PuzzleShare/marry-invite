"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/auth";

import Login from "@/components/Login";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ListItemIcon from "@mui/material/ListItemIcon";

import PersonIcon from "@mui/icons-material/Person";
import Logout from "@mui/icons-material/Logout";
import { useUser } from "@/api/users";
import apiClient from "@/lib/axios";

export default function Header() {
  const [user, setUser] = useAtom(userAtom);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    prevOpen.current = open;
  }, [open]);

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
            onClick={() => {
              router.push("/");
            }}
          >
            Marry Invite
          </Typography>
          {user ? (
            <div>
              <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 100 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: "right top",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={(e) => {
                              handleClose(e);
                              router.push("/mypage");
                            }}
                          >
                            <ListItemIcon>
                              <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            Mypage
                          </MenuItem>
                          <MenuItem
                            onClick={async (e) => {
                              try {
                                await apiClient.post("/api/logout");
                                setUser(null);
                                handleClose(e);
                                router.push("/");
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            <ListItemIcon>
                              <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <Button
              onClick={() => {
                setLoginOpen(true);
              }}
              color="default"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </React.Fragment>
  );
}
