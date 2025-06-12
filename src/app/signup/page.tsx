// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/signup', { email, password });
      alert(response.data.message);
    } catch (err: any) {
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
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

        {password && (
          <p style={{ color: strength === 'Weak' ? 'red' : strength === 'Medium' ? 'orange' : 'green', marginBottom: '12px' }}>
            Password Strength: {strength}
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
