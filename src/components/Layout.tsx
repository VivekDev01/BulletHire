'use client';

import React, { useState, useEffect, createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';
import axios from 'axios';
import { url } from '../config';

type Props = {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  centered?: boolean;
};

// Create the context
export const userContext = createContext({
  name: '',
  email: '',
  profilePicture: '',
  id: ''
});

const Layout = ({ children, className, fullWidth = true, centered = false }: Props) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    id: ''
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
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
      
      if(localStorage.getItem('token')) fetchUserData();
    }
  }, []);

  return (
    <userContext.Provider value={userData}>
      <div className={styles.layoutWrapper}>
        <Header />
        
        <main className={`
          ${styles.main} 
          ${fullWidth ? styles.fullWidth : ''} 
          ${centered ? styles.centered : ''}
          ${className || ''}
        `}>
          <div className={styles.container}>
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </userContext.Provider>
  );
};

export default Layout;
