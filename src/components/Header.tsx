import React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const isAuthenticated = true; // Replace with actual authentication logic
    console.log("Current Path:", pathname);

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
            
            {isAuthenticated && (pathname==='/' || pathname==='/home') &&
                <div className={styles.authButtons}>
                    <Link href="/post-jd-keywords">
                        <button className={styles.profileButton}>Post with AI</button>
                    </Link>
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
