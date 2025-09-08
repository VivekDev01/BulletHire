'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { url } from '../../config';
import Layout from '@/components/Layout';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }

      setIsLoading(true);
      const payload = {
        email: email,
        password: password,
      };
      
      const response = await axios.post(`${url}/api/login`, payload);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';
    } catch (err: any) {
      console.error('Login error:', err);
      alert(err?.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = `${url}/auth/login`;
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Layout>
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.welcomeIcon}>
              <LoginIcon className={styles.headerIcon} />
            </div>
            <h2 className={styles.title}>Welcome Back</h2>
            <p className={styles.subtitle}>Sign in to your account to continue</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <EmailIcon className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <LockIcon className={styles.inputIcon} />
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className={styles.eyeIcon}
                >
                  {passwordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot your password?
              </Link>
            </div>

            <button 
              onClick={handleSubmit} 
              className={`${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className={styles.divider}>
              <span className={styles.dividerText}>or</span>
            </div>

            <button 
              onClick={handleGoogleLogin} 
              className={`${styles.googleBtn} ${isGoogleLoading ? styles.loading : ''}`}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                <>
                  <GoogleIcon className={styles.googleIcon} />
                  Continue with Google
                </>
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.toggleText}>
              Don't have an account?
              <Link href="/signup" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}