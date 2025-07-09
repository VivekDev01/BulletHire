"use client";
import React, {useEffect, useState} from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import axios from 'axios';
import {url} from '../config'

const Header = () => {
    const pathname = usePathname();
    const isAuthenticated = true; 
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        id: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/api/get_user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const user = response.data.user;
                if (user) {
                    setUserData({
                        name: user.username || '',
                        email: user.email || '',
                        profilePicture: user.profilePicture || '',
                        id: user.id || ''
                    });
                } else {
                    setUserData({
                        name: '',
                        email: '',
                        profilePicture: '',
                        id: ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUserData({
                    name: '',
                    email: '',
                    profilePicture: '',
                    id: ''
                });
            }
        };
        fetchUserData();
    }, []);
    
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        try{
            axios.post(`${url}/api/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response) => {
                console.log('Logout successful:', response.data);
            }).catch((error) => {
                console.error('Error during logout:', error);
            });
        }
        catch (error) {
            console.error('Error in handleLogout:', error);
        }
        console.log('Logging out...');
        localStorage.removeItem('token');
        console.log('Token removed from localStorage');
        setAnchorEl(null);
        window.location.href = '/signin';
    }
    

  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.logo}>
                <span style={{color:"#383838"}}>Bullet</span>
                <span style={{color:"#4184D6"}}>Hire</span>          
            </div>
            {pathname === '/' && (
                <nav className={styles.nav}>
                    <a href="#">Become a recruiter</a>
                    <a href="#">Good deals</a>
                    <a href="#how_it_works">How it work</a>
                    <a href="#why_choose_us">Why choose us</a>
                </nav>
            )}
            
            {isAuthenticated  &&
                <div>
                    <button
                        className={styles.avatarButton}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar alt={userData.name} src="" />

                    </button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                        }}
                    >
                        <MenuItem onClick={handleClose}>{userData.name}</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
            }   
            {!isAuthenticated &&
                <div className={styles.authButtons}>
                    <Link href="/signin">
                        <button className={styles.signIn} >Sign in</button>
                    </Link>
                    <Link href="/signup">
                        <button className={styles.signUp}>Sign up</button>
                    </Link>
                </div>
            }
        </header>
    </div>

  );
};

export default Header;
