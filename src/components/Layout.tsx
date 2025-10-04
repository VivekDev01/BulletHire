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
export const userContext = createContext<UserData>({
  username: '',
  email: '',
  phone: '',
  password: '',
  profilePicture: '',
  resume: '',
  experience: [],
  skills: [],
  courses: [],
  certifications: [],
  id: '',
  isPhoneVerified: false
});

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface Course {
  id: string;
  name: string;
  institution: string;
  completionDate: string;
  certificate: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
}

interface UserData {
  username: string;
  email: string;
  phone: string;
  password: string;
  profilePicture: string;
  resume: string;
  experience: Experience[];
  skills: string[];
  courses: Course[];
  certifications: Certification[];
  id: string;
  isPhoneVerified: boolean;
}

const Layout = ({ children, className, fullWidth = true, centered = false }: Props) => {
  const [userData, setUserData] = useState<UserData>({
      username: '',
      email: '',
      phone: '',
      password: '',
      profilePicture: '',
      resume: '',
      experience: [],
      skills: [],
      courses: [],
      certifications: [],
      id: '',
      isPhoneVerified: false
    });

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
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || '',
          password: '********',
          profilePicture: user.profilePicture || '',
          resume: user.resume || '',
          experience: user.experience || [],
          skills: user.skills || [],
          courses: user.courses || [],
          certifications: user.certifications || [],
          id: user._id || '',
          isPhoneVerified: user.isPhoneVerified || false
        });
        localStorage.setItem('userId', user._id || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
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
