'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Layout from '@/components/Layout';

const CenteredTextAreaPage = () => {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = () => {
    console.log('Job Role:', jobRole);
    console.log('Description:', jobDescription);
    // send this to Flask backend via fetch or Axios
  };

  return (
    <Layout>
        <div className={styles.container}>
        <div className={styles.topInfo}>
            <h2 className={styles.title}>Create a Job Description using AI</h2>
            <p className={styles.subtitle}>Fill out the details below to create a job listing</p>
        </div>

        <div className={styles.formWrapper}>
            <input
            className={styles.input}
            type="text"
            placeholder="Job Role (e.g. DevOps Engineer)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            />

            <input
            className={styles.input}
            type="text"
            placeholder="Location (e.g. Bengaluru, India)"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            />

            <textarea
            className={styles.textArea}
            placeholder="Keywords (e.g. responsibilities, requirements, etc.)"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            />
        </div>

        <div className={styles.bottomInfo}>
            <p className={styles.tip}>Tip: Clear role and keywords for role attract better job description.</p>
            <button className={styles.submitBtn} onClick={handleSubmit}>
            Create Job Description
            </button>
        </div>
        </div>
    </Layout>
  );
};

export default CenteredTextAreaPage;
