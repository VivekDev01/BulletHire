'use client';

import styles from './page.module.css'
import axios from 'axios';
import Layout from '@/components/Layout';
import {url} from '../../config'
import { useEffect, useState } from 'react';
import JobsCardComponent from '@/components/JobCard/JobCard';

export default function JobsCard(){
    const [jobs, setJobs] = useState([]);

    const getJobs = async () =>{
        try {
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
            
        }
    }

    useEffect(()=>{
        getJobs()
    }, [])

    return (
        <Layout>
            <main className={styles.main}>
                {jobs?.map((job, index) => (
                    <div key={index} className={styles.cards}>
                        <JobsCardComponent jobDetails={job} />
                    </div>
                ))}
            </main>
        </Layout>
    )
}