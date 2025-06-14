'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Layout from '@/components/Layout';

const GeneratedJobDescriptionPage = () => {
  const [role, setRole] = useState('Data Scientist');
  const [isEditingRole, setIsEditingRole] = useState(false);

  const [location, setLocation] = useState('Bengaluru');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [description, setDescription] = useState(
`We are looking for a Data Scientist with expertise in Python, SQL, and Machine Learning. The ideal candidate should have a minimum of 3 years of experience in Python, SQL, and Machine Learning skills.

Key Responsibilities:
- Analyze large datasets to uncover trends, patterns, and insights
- Develop machine learning models to predict outcomes and solve complex problems
- Collaborate with cross-functional teams to drive data-driven decisions
- Communicate findings and recommendations to stakeholders

Requirements:
- Bachelor's degree in Computer Science or related field
- 3+ years of experience in Python, SQL, and Machine Learning
- Strong analytical and problem-solving skills
- Excellent communication and teamwork skills

To apply for this position, please click on the following link: https://example.com/apply. 

We look forward to receiving your application!`
  );
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  return (
    <Layout>
        <div className={styles.parentContainer}>
            <div className={styles.container}>
            <h2 className={styles.heading}>Finalize Job Description</h2>

            {/* Job Role */}
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Job Role</label>
                {isEditingRole ? (
                <>
                    <input
                    className={styles.input}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    />
                    <button onClick={() => setIsEditingRole(false)} className={styles.saveBtn}>Save</button>
                </>
                ) : (
                <div className={styles.displayRow}>
                    <span>{role}</span>
                    <button onClick={() => setIsEditingRole(true)} className={styles.editBtn}>Edit</button>
                </div>
                )}
            </div>

            {/* Location */}
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Location</label>
                {isEditingLocation ? (
                <>
                    <input
                    className={styles.input}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                    <button onClick={() => setIsEditingLocation(false)} className={styles.saveBtn}>Save</button>
                </>
                ) : (
                <div className={styles.displayRow}>
                    <span>{location}</span>
                    <button onClick={() => setIsEditingLocation(true)} className={styles.editBtn}>Edit</button>
                </div>
                )}
            </div>

            {/* Description */}
            <div className={styles.fieldGroup}>
                <label className={styles.label}>Job Description</label>
                {isEditingDescription ? (
                <>
                    <textarea
                    className={styles.textArea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={() => setIsEditingDescription(false)} className={styles.saveBtn}>Save</button>
                </>
                ) : (
                <div className={styles.displayDescription}>
                    <pre className={styles.preserve}>{description}</pre>
                    <button onClick={() => setIsEditingDescription(true)} className={styles.editBtn}>Edit</button>
                </div>
                )}
            </div>

            <button className={styles.finalizeBtn} onClick={() => {
                
                // TODO: send to Flask backend via fetch/axios
                }}>
                Finalize & Post
            </button>

            </div>
        </div>
    </Layout>
  );
};

export default GeneratedJobDescriptionPage;
