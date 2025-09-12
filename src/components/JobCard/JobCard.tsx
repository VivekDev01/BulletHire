'use client'

import { useState } from "react";
import styles from './JobCard.module.css'
import axios from "axios";
import { url } from "../../config";

// // Sample job data for demonstration
// const sampleJobDetails = {
//     role: "Senior Frontend Developer",
//     location: "San Francisco, CA",
//     experience: "3-5 years",
//     salary: "$120,000 - $150,000",
//     skills: "React, TypeScript, Node.js, GraphQL, CSS3, HTML5",
//     created_at: "2024-01-15T10:30:00Z",
//     user: {
//         username: "TechCorp"
//     }
// };

type JobDetails = {
    _id?: string;
    role: string;
    location: string;
    experience: string;
    salary?: string;
    skills?: string;
    created_at?: string;
    user: {
        username: string;
    };
};

export default function JobsCard({ jobDetails }: { jobDetails: JobDetails }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    let role = jobDetails.role;
    let location = jobDetails.location;
    let experience = jobDetails.experience;
    let salary = jobDetails.salary ? jobDetails.salary : "Not specified";
    let skills = jobDetails.skills ? jobDetails.skills.split(", ") : [];
    let postedAt = jobDetails.created_at ? new Date(jobDetails.created_at).toLocaleDateString() : "Unknown"

    let postedBy = jobDetails.user.username;

    const handleApply = async () => {
        try {
            console.log('Applying for job:', jobDetails);
            const res =  await axios.post(`${url}/api/apply`, { jobId: jobDetails?._id }, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if(res.status === 200){
                alert('Application submitted successfully!');
            } else {
                alert('Failed to submit application. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred. Please try again later.');
        }
    }

    return(
        <div className={styles.jobCard}>
            <div className={styles.jobCardHeader}>
                <div className={styles.jobTitleSection}>
                    <h2 className={styles.jobTitle}>{role}</h2>
                    <span className={styles.companyName}>{postedBy}</span>
                </div>
                <button 
                    className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l7-3 7 3z" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            fill={isBookmarked ? "currentColor" : "none"}
                        />
                    </svg>
                </button>
            </div>

            <div className={styles.jobDetails}>
                <div className={styles.detailRow}>
                    <div className={styles.detailItem}>
                        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{location}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{experience} Years</span>
                    </div>

                    <div className={styles.detailItem}>
                        <svg className={styles.icon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={styles.salary}>{salary}</span>
                    </div>
                    
                </div>

                

                {skills.length > 0 && (
                    <div className={styles.skillsSection}>
                        {/* <h4 className={styles.skillsTitle}>Required Skills</h4> */}
                        <div className={styles.skillsContainer}>
                            {skills.map((skill, index) => (
                                <span key={index} className={styles.skillTag}>
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.jobCardFooter}>
                <span className={styles.postedDate}>{postedAt}</span>
                <div className={styles.actionButtons}>
                    <button className={styles.btnSecondary}>View Details</button>
                    <button className={styles.btnPrimary} onClick={handleApply}>Apply Now</button>
                </div>
            </div>
        </div>
    )
}