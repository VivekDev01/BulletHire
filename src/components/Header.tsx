"use client";
import React, { useEffect, useState, useContext } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { url } from '../config';
import { userContext } from '../components/Layout'
import { motion, useScroll } from "motion/react"


const Header = () => {
  const { scrollYProgress } = useScroll();

    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const open = Boolean(anchorEl);
    // const [userData, setUserData] = useState({
    //     name: '',
    //     email: '',
    //     profilePicture: '',
    //     id: ''
    // });
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const userData = useContext(userContext);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            setIsAuthenticated(!!localStorage.getItem('token'));
        }

        // Add scroll listener for header background
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useEffect(() => {
    //     if (isAuthenticated && typeof window !== "undefined") {
    //         const fetchUserData = async () => {
    //             try {
    //                 const response = await axios.get(`${url}/api/get_user`, {
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem('token')}`
    //                     }
    //                 });
    //                 const user = response.data.user;
    //                 if (user) {
    //                     setUserData({
    //                         name: user.username || '',
    //                         email: user.email || '',
    //                         profilePicture: user.profilePicture || '',
    //                         id: user._id || ''
    //                     });
    //                     localStorage.setItem('userId', user._id || '');
    //                 } else {
    //                     setUserData({
    //                         name: '',
    //                         email: '',
    //                         profilePicture: '',
    //                         id: ''
    //                     });
    //                 }
    //             } catch (error) {
    //                 console.error('Error fetching user data:', error);
    //                 setUserData({
    //                     name: '',
    //                     email: '',
    //                     profilePicture: '',
    //                     id: ''
    //                 });
    //             }
    //         };
    //         fetchUserData();
    //     }
    // }, [isAuthenticated]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        try {
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
            localStorage.removeItem('userId');
        }
        setAnchorEl(null);
        setMobileMenuOpen(false);
        window.location.href = '/signin';
    };

    const handleNavClick = (path: string) => {
        router.push(path);
        setMobileMenuOpen(false);
    };

    if (!mounted) return null;

    return (
        <div className={`${styles.container} ${scrolled ? styles.scrolled : ''}`}>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    originX: 0, 
                    zIndex: 100,
                    backgroundColor: "#ff0088",
                }}
                >
            </motion.div>
            <header className={styles.header}>
                <div className={styles.logo} onClick={() => router.push('/')}>
                    <div className={styles.logoIcon}>BH</div>
                    <div className={styles.logoText}>
                        <span className={styles.logoMain}>Bullet</span>
                        <span className={styles.logoAccent}>Hire</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    {!isAuthenticated && pathname === '/' ? (
                        <nav className={styles.nav}>
                            <a href="#how_it_works" className={styles.navLink}>
                                How it works
                            </a>
                            <a href="#why_choose_us" className={styles.navLink}>
                                Why choose us
                            </a>
                            <a href="#become_recruiter" className={styles.navLink}>
                                Become a recruiter
                            </a>
                            <a href="#good_deals" className={styles.navLink}>
                                Good deals
                            </a>
                        </nav>
                    ) : pathname !== '/' && pathname !== '/signin' && pathname !== '/signup' && (
                        <nav className={styles.nav}>
                            <button
                                onClick={() => handleNavClick("/dashboard")}
                                className={`${styles.navButton} ${pathname === '/dashboard' ? styles.active : ''}`}
                            >
                                <DashboardIcon className={styles.navIcon} />
                                Dashboard
                            </button>
                            <button
                                onClick={() => handleNavClick("/create-jd")}
                                className={`${styles.navButton} ${pathname === '/create-jd' ? styles.active : ''}`}
                            >
                                <PostAddIcon className={styles.navIcon} />
                                Post Job
                            </button>
                            <button
                                onClick={() => handleNavClick("/jobs-cards")}
                                className={`${styles.navButton} ${pathname === '/jobs-cards' ? styles.active : ''}`}
                            >
                                <WorkIcon className={styles.navIcon} />
                                Jobs
                            </button>
                            <button
                                onClick={() => handleNavClick("/nill")}
                                className={`${styles.navButton} ${pathname === '/nill' ? styles.active : ''}`}
                            >
                                NILL
                            </button>
                        </nav>
                    )}
                </div>

                {/* Right side content */}
                <div className={styles.rightSection}>
                    {isAuthenticated ? (
                        <div className={styles.userSection}>
                            <button
                                className={styles.avatarButton}
                                aria-controls={open ? 'user-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <Avatar 
                                    alt={userData.name} 
                                    src={userData.profilePicture || ""} 
                                    className={styles.avatar}
                                >
                                    {!userData.profilePicture && userData.name.charAt(0).toUpperCase()}
                                </Avatar>
                                <span className={styles.userName}>{userData.name}</span>
                            </button>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                className={styles.userMenu}
                                slotProps={{
                                    paper: {
                                        className: styles.menuPaper
                                    }
                                }}
                            >
                                <MenuItem 
                                    onClick={() => { handleClose(); router.push(`/profile`); }}
                                    className={styles.menuItem}
                                >
                                    <PersonIcon className={styles.menuIcon} />
                                    View Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose} className={styles.menuItem}>
                                    <AccountCircleIcon className={styles.menuIcon} />
                                    My Account
                                </MenuItem>
                                <MenuItem onClick={handleLogout} className={styles.menuItem}>
                                    <LogoutIcon className={styles.menuIcon} />
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : pathname !== '/signin' && pathname !== '/signup' && (
                        <div className={styles.authButtons}>
                            <Link href="/signin">
                                <button className={styles.signIn}>Sign in</button>
                            </Link>
                            <Link href="/signup">
                                <button className={styles.signUp}>Sign up</button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button 
                        className={styles.mobileMenuButton}
                        onClick={handleMobileToggle}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.mobileNavOpen : ''}`}>
                {!isAuthenticated && pathname === '/' ? (
                    <div className={styles.mobileNavContent}>
                        <a href="#how_it_works" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                            How it works
                        </a>
                        <a href="#why_choose_us" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                            Why choose us
                        </a>
                        <a href="#become_recruiter" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                            Become a recruiter
                        </a>
                        <a href="#good_deals" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                            Good deals
                        </a>
                    </div>
                ) : pathname !== '/' && pathname !== '/signin' && pathname !== '/signup' && (
                    <div className={styles.mobileNavContent}>
                        <button
                            onClick={() => handleNavClick("/dashboard")}
                            className={`${styles.mobileNavButton} ${pathname === '/dashboard' ? styles.active : ''}`}
                        >
                            <DashboardIcon />
                            Dashboard
                        </button>
                        <button
                            onClick={() => handleNavClick("/create-jd")}
                            className={`${styles.mobileNavButton} ${pathname === '/create-jd' ? styles.active : ''}`}
                        >
                            <PostAddIcon />
                            Post Job
                        </button>
                        <button
                            onClick={() => handleNavClick("/jobs-cards")}
                            className={`${styles.mobileNavButton} ${pathname === '/jobs-cards' ? styles.active : ''}`}
                        >
                            <WorkIcon />
                            Jobs
                        </button>
                        <button
                            onClick={() => handleNavClick("/nill")}
                            className={`${styles.mobileNavButton} ${pathname === '/nill' ? styles.active : ''}`}
                        >
                            NILL
                        </button>
                    </div>
                )}

                {!isAuthenticated && pathname !== '/signin' && pathname !== '/signup' && (
                    <div className={styles.mobileAuthButtons}>
                        <Link href="/signin">
                            <button className={styles.mobileSignIn} onClick={() => setMobileMenuOpen(false)}>
                                Sign in
                            </button>
                        </Link>
                        <Link href="/signup">
                            <button className={styles.mobileSignUp} onClick={() => setMobileMenuOpen(false)}>
                                Sign up
                            </button>
                        </Link>
                    </div>
                )}

                {isAuthenticated && (
                    <div className={styles.mobileUserSection}>
                        <div className={styles.mobileUserInfo}>
                            <Avatar src={userData.profilePicture || ""} className={styles.mobileAvatar}>
                                {!userData.profilePicture && userData.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <span className={styles.mobileUserName}>{userData.name}</span>
                        </div>
                        <button 
                            onClick={() => { router.push(`/profile`); setMobileMenuOpen(false); }}
                            className={styles.mobileNavButton}
                        >
                            <PersonIcon />
                            View Profile
                        </button>
                        <button onClick={() => { handleClose(); setMobileMenuOpen(false); }} className={styles.mobileNavButton}>
                            <AccountCircleIcon />
                            My Account
                        </button>
                        <button onClick={handleLogout} className={styles.mobileNavButton}>
                            <LogoutIcon />
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;