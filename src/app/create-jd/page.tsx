'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Layout from '@/components/Layout';
import axios from 'axios';
import {agent_url} from '../../config'

const CenteredTextAreaPage = () => {
  const [jobRole, setJobRole] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');

  const handleSubmit = async () => {
    console.log('Job Role:', jobRole);
    console.log('Description:', skills);
    console.log('Location:', location);
    try{
        const res = await axios.post(`${agent_url}/create_jd`, {
          'role':jobRole,
          'location':location,
          'skills': skills,
          'experience': experience ? parseInt(experience, 10) : 0,
          'education': education,
          'link':'www.example.com'
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
    }
    catch (error) {
      console.error('Error creating job description:', error);
    }
  };

  return (
    <Layout>
        <div className={styles.container}>
        <div className={styles.topInfo}>
            <h2 className={styles.title}>Create a Job Description using AI</h2>
            <p className={styles.subtitle}>Fill out the details below to create a job listing</p>
        </div>

        <div className={styles.formWrapper}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="jobRole">Job Role</label>
            <input
              id="jobRole"
              className={styles.input}
              type="text"
              placeholder="e.g. DevOps Engineer"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="location">Location</label>
            <input
              id="location"
              className={styles.input}
              type="text"
              placeholder="e.g. Bengaluru, India"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="education">Education</label>
            <input
              id="education"
              className={styles.input}
              type="text"
              placeholder="e.g. B.Tech"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="experience">Experience (Years)</label>
            <input
              id="experience"
              className={styles.input}
              type="number"
              placeholder="e.g. 3"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              min="0"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="skills">Keywords / Skills</label>
            <textarea
              id="skills"
              className={styles.textArea}
              placeholder="e.g. Flask, React, etc."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
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
