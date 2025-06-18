// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Eye from '@mui/icons-material/Visibility';
import EyeOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { url } from '../../config';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      const payload = {
        email: email,
        password: password,
      }
      const response = await axios.post(`${url}/api/login`, payload);
      alert(response.data.message);
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home'; 
    } catch (err: any) {
      console.error('Login error:', err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.card}>
        <h2>Sign In</h2>
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
            onChange={(e) => setPassword(e.target.value)}
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

        <button onClick={handleSubmit} className={styles.submitBtn}>
          Sign In
        </button>

        <p className={styles.toggleText}>
          Don’t have an account? <Link className='Link'style={{ color: 'blue' }} href="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
