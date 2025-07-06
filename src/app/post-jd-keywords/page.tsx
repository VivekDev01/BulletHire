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
  const [experience, setExperience] = useState<number | undefined>()
  const [education, setEducation] = useState('')


  const handleSubmit = async () => {
    console.log('Job Role:', jobRole);
    console.log('Description:', skills);
    console.log('Location:', location);
    try{
        const res = await axios.post(`${agent_url}/create_jd`, {
          'role':jobRole,
          'location':location,
          'skills': skills,
          'experience' : experience,
          'education': education,
          'link' : "www.example.com"
        },
        {
          headers:{
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              className={styles.input}
              type="text"
              placeholder="Education (e.g. B.tech)"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />

            <input
              className={styles.input}
              type="number"
              placeholder="Experience in Years (e.g. 3)"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
            />

            <textarea
              className={styles.textArea}
              placeholder="Keywords (e.g. Flask, React, etc.)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
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
