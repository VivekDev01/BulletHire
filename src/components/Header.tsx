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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: '',
        id: ''
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            setIsAuthenticated(!!localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated && typeof window !== "undefined") {
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
                            id: user._id || ''
                        });
                        localStorage.setItem('userId', user._id || '');
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
        }
    }, [isAuthenticated]);

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
                    Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem('token') : ''}`
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
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
        }
        setAnchorEl(null);
        window.location.href = '/signin';
    }

    if (!mounted) return null; // Prevent SSR mismatch

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo} onClick={() => window.location.href = '/'}>
                    <span style={{color:"#383838"}}>Bullet</span>
                    <span style={{color:"#4184D6"}}>Hire</span>          
                </div>
                {!isAuthenticated && pathname === '/' ? (
                    <nav className={styles.nav}>
                        <a href="#how_it_works" className={styles.navLink}>How it works</a>
                        <a href="#why_choose_us" className={styles.navLink}>Why choose us</a>
                        <a href="#become_recruiter" className={styles.navLink}>Become a recruiter</a>
                        <a href="#good_deals" className={styles.navLink}>Good deals</a>
                    </nav>
                )
                : pathname !== '/' && pathname !== '/signin' && pathname !== '/signup' &&
                (
                    <nav className={styles.nav}>
                        <a href="/dashboard" className={styles.navLink}>Dashboard</a>
                        <a href="/create-jd" className={styles.navLink}>Post Job</a>
                        <a href="/nill" className={styles.navLink}>NILL</a>
                        <a href="/nill" className={styles.navLink}>NILL</a>
                    </nav>
                )
            }
                
                {isAuthenticated  &&
                    <div>
                        <button
                            className={styles.avatarButton}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Avatar alt={userData.name} src={userData.profilePicture || ""} />
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
                {!isAuthenticated && pathname !== '/signin' && pathname !== '/signup' &&
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