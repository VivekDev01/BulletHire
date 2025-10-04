'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Layout from '@/components/Layout';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { url } from '@/config';


const GeneratedJobDescriptionPage = () => {
  const params = useParams();
  const jd_id = params.jd_id as string;

//   const [role, setRole] = useState('Data Scientist');
//   const [isEditingRole, setIsEditingRole] = useState(false);

//   const [location, setLocation] = useState('Bengaluru');
//   const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [description, setDescription] = useState('');
  const [isEditingDescription, setIsEditingDescription] = useState(false);



  const getJobDescription = async (jd_id: string) => {
    try {
      const response = await axios.get(`${url}/get_jd/${jd_id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
      );
      if (response.data) {
        // setRole(response.data.job.role);
        // setLocation(response.data.job.location);
        setDescription(response.data.job.job_description);
      }
    } catch (error) {
      console.error('Error fetching job description:', error);
    }
  };
  useEffect(() => {
    if (jd_id) {
      getJobDescription(jd_id);
    }
  }, [jd_id]);



  return (
    <Layout>
        <div className={styles.parentContainer}>
            <div className={styles.container}>
            <h2 className={styles.heading}>Finalize Job Description</h2>

            {/* Job Role */}
            {/* <div className={styles.fieldGroup}>
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
            </div> */}

            {/* Location */}
            {/* <div className={styles.fieldGroup}>
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
            </div> */}

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

            <button 
                className={styles.finalizeBtn} 
                onClick={async () => {
                    try{
                        const response = await axios.post(`${url}/finalize_jd/${jd_id}`, {
                            job_description: description
                        }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        });

                        if (response.status === 200) {
                            alert('Job description posted successfully!');
                            window.location.href = `/home`;
                        } else {
                            console.error('Error finalizing job description:', response.data);
                        }
                    }
                    catch(error){
                        console.error('Error finalizing job description:', error);
                    }
                }}
            >
                Finalize & Post
            </button>
            </div>
        </div>
    </Layout>
  );
};

export default GeneratedJobDescriptionPage;
