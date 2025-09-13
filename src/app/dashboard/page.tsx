'use client'

import React from "react";
import Layout from "@/components/Layout";
import styles from './page.module.css'

const DashboardPage = () => {
    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Your Jobs</h1>
                    {/* <p className={styles.subtitle}>Job ID: </p> */}
                </div>
            </main>
        </Layout>
    );
};

export default DashboardPage;
