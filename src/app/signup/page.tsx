'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { url } from '../../config';
import Layout from '@/components/Layout';
import { Modal, Backdrop, Fade } from '@mui/material';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [strength, setStrength] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [emailVerificationModalOpen, setEmailVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const evaluateStrength = (pwd: string) => {
    if (pwd.length < 6) return 'Weak';
    if (/\d/.test(pwd) && /[A-Z]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd)) return 'Strong';
    return 'Medium';
  };
  
  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setStrength(evaluateStrength(val));
  };

  const handlePasswordChange2 = (val: string) => {
    setConfirmPassword(val);
  };

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      if (strength === 'Weak') {
        alert('Password is too weak');
        return;
      }
      if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/.test(password)) {
        alert('Password must contain at least one uppercase letter, one number, and one special character');
        return;
      }

      setIsLoading(true);
      const payload = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(`${url}/api/signup`, payload);
      console.log(response.data);
      setEmailVerificationModalOpen(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Signup error:', err);
      // alert(err?.response?.data?.message || 'Signup failed');
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    try {
      const response = await axios.post(`${url}/api/verify-email`, { 
        code: verificationCode, 
        email: email 
      });
      console.log(response.data);
      alert('Email verified successfully');
      setEmailVerificationModalOpen(false);
      window.location.href = '/signin';
    } catch (error) {
      console.error('Email verification error:', error);
      alert('Email verification failed');
    }
  };

  const getStrengthColor = () => {
    switch (strength) {
      case 'Weak': return '#ff4444';
      case 'Medium': return '#ff8800';
      case 'Strong': return '#00cc44';
      default: return '#666';
    }
  };

  return (
    <Layout>
      <div className={styles.authContainer}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Join us today and get started</p>
          </div>

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <PersonIcon className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <EmailIcon className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => handlePasswordChange(e.target.value)}
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

            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <LockIcon className={styles.inputIcon} />
                <input
                  type={passwordVisible2 ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => handlePasswordChange2(e.target.value)}
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible2(!passwordVisible2)}
                  className={styles.eyeIcon}
                >
                  {passwordVisible2 ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div 
                    className={`${styles.strengthFill} ${styles[strength?.toLowerCase()]}`}
                    style={{ backgroundColor: getStrengthColor() }}
                  ></div>
                </div>
                <p className={styles.strengthText} style={{ color: getStrengthColor() }}>
                  Password Strength: {strength}
                </p>
              </div>
            )}

            {password && confirmPassword && password !== confirmPassword && (
              <div className={styles.errorMessage}>
                <span>⚠️ Passwords do not match</span>
              </div>
            )}

            <button 
              onClick={handleSubmit} 
              className={`${styles.submitBtn} ${isLoading ? styles.loading : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner}></div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.toggleText}>
              Already have an account? 
              <Link href="/signin" className={styles.link}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={emailVerificationModalOpen}
        onClose={() => setEmailVerificationModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={emailVerificationModalOpen}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <CheckCircleIcon className={styles.modalIcon} />
              <h2>Verify Your Email</h2>
              <p>We&apos;ve sent a verification code to your email address</p>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.modalActions}>
                <button 
                  onClick={handleEmailVerification}
                  className={styles.verifyBtn}
                >
                  Verify Email
                </button>
                <button 
                  onClick={() => setEmailVerificationModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </Layout>
  );
}