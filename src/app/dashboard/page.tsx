'use client'

import React, {useState, useEffect} from "react";
import Layout from "@/components/Layout";
import styles from './page.module.css'
import TiltCard from "@/components/TiltCard/TiltCard";
import axios from "axios";
import {url} from '../../config'
import { Briefcase, TrendingUp, Users } from 'lucide-react';

type Job = {
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
    applicants?: string[];
};

const DashboardPage = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const getJobs = async () =>{
        try {
            setLoading(true);
            const res = await axios.get(`${url}/get_jobs`, {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.status==200){
                setJobs(res.data.jobs);
            }
            else{
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getJobs()
    }, [])

    // Calculate stats
    const totalJobs = jobs.length;
    const totalCandidates = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);
    const activeJobs = jobs.filter(job => job.applicants && job.applicants.length > 0).length;
    
    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>Your Job Dashboard</h1>
                        <p className={styles.subtitle}>Manage and track all your job postings</p>
                    </div>
                    
                    <div className={styles.statsContainer}>
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Briefcase size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{totalJobs}</span>
                                <span className={styles.statLabel}>Total Jobs</span>
                            </div>
                        </div>
                        
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Users size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{totalCandidates}</span>
                                <span className={styles.statLabel}>Total Applications</span>
                            </div>
                        </div>
                        
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <TrendingUp size={24} />
                            </div>
                            <div className={styles.statInfo}>
                                <span className={styles.statNumber}>{activeJobs}</span>
                                <span className={styles.statLabel}>Active Jobs</span>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p className={styles.loadingText}>Loading your jobs...</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Briefcase size={48} />
                        <h3>No Jobs Posted Yet</h3>
                        <p>Start by creating your first job posting to attract top talent.</p>
                    </div>
                ) : (
                    <div className={styles.jobsGrid}>
                        {jobs?.map((job, index) => (
                            <div className={styles.cardWrapper} key={job._id || index}>
                                <TiltCard job={job} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default DashboardPage;