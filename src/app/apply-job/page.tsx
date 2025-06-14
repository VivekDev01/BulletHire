'use client';
import React, { useState } from 'react';
import styles from './page.module.css';

const JobApplicationPage = () => {
  const role = 'Data Scientist';
  const location = 'Bengaluru';
  const jobDescription = `
We are looking for a Data Scientist with expertise in Python, SQL, and Machine Learning.

Key Responsibilities:
- Analyze datasets
- Build ML models
- Collaborate cross-functionally

Requirements:
- 3+ years experience
- Strong Python & SQL
- Team player

Apply here: https://example.com/apply
`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentLocation: '',
    comfortable: '',
    resume: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // TODO: Send to backend with FormData if needed
  };

  return (
    <div className={styles.container}>
      <div className={styles.jobInfo}>
        <h2>{role}</h2>
        <p><strong>Location:</strong> {location}</p>
        <pre className={styles.jobDesc}>{jobDescription}</pre>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.formTitle}>Apply to this Job</h3>

        <label className={styles.label}>Name</label>
        <input className={styles.input} type="text" name="name" required onChange={handleChange} />

        <label className={styles.label}>Email</label>
        <input className={styles.input} type="email" name="email" required onChange={handleChange} />

        <label className={styles.label}>Phone</label>
        <input className={styles.input} type="text" name="phone" required onChange={handleChange} />

        <label className={styles.label}>Current Location</label>
        <input className={styles.input} type="text" name="currentLocation" required onChange={handleChange} />

        <label className={styles.label}>Are you comfortable working in {location}?</label>
        <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
            <input type="radio" name="comfortable" value="Yes" required onChange={handleChange} />
            Yes
        </label>
        <label className={styles.radioLabel}>
            <input type="radio" name="comfortable" value="No" onChange={handleChange} />
            No
        </label>
        </div>

        <label className={styles.label}>Upload Resume</label>
        <input className={styles.fileInput} type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />


        <button type="submit" className={styles.submitBtn}>Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationPage;
