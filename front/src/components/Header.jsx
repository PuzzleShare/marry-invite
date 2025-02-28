"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color='default' sx={{ marginBottom: '20px' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ cursor: 'pointer', flexGrow: 1 }} onClick={() => { props.setContent("Main"); }}>
                    Marry Invite
                </Typography>
                {props.auth ? (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => { props.setContent("Mypage"); handleClose(); }}>Mypage</MenuItem>
                            <MenuItem onClick={() => { props.setContent("Main"); props.setAuth(false); handleClose(); }}>Logout</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Button onClick={() => { props.setAuth(true) }} color='default'>Login</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}
