'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { url } from '../../config';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [strength, setStrength] = useState('');

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
      const payload = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(`${url}/api/signup`, payload);
      console.log(response.data);
      alert(response.data.message);
      window.location.href = '/signin';
    } catch (err: any) {
      console.error('Signup error:', err);
      alert(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <div className={styles.passwordWrapper}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className={styles.eyeIcon}
          >
            {passwordVisible ? <EyeOff /> : <Eye />}
          </button>
        </div>

        <div className={styles.passwordWrapper}>
          <input
            type={passwordVisible2 ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handlePasswordChange2(e.target.value)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible2(!passwordVisible2)}
            className={styles.eyeIcon}
          >
            {passwordVisible2 ? <EyeOff /> : <Eye />}
          </button>
        </div>

        {password && (
          <p style={{ color: strength === 'Weak' ? 'red' : strength === 'Medium' ? 'orange' : 'green', marginBottom: '12px' }}>
            Password Strength: {strength}
          </p>
        )}

        {password && confirmPassword && password !== confirmPassword && (
          <p style={{ color: 'red', marginBottom: '12px' }}>
            Passwords do not match
          </p>
        )}

        <button onClick={handleSubmit} className={styles.submitBtn}>
          Sign Up
        </button>

        <p className={styles.toggleText}>
          Already have an account? <Link style={{color:'blue'}} href="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
