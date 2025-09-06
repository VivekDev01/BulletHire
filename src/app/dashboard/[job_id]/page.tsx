'use client';

import React, { use, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import {url} from "../../../config";
import Layout from '@/components/Layout';

interface Applicant {
    id: string;
    name: string;
    email: string;
    resumeScore?: number;
    oaScore?: number;
    resumeFile?: string;
    resumeFileName?: string;
    college: string;
    degree: string;
    experience: number;
}

interface DashboardPageProps {
    params: Promise<{
        job_id: string;
    }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
    const { job_id } = use(params); 
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<keyof Applicant>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');
    

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/fetchapplicants/${job_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setApplicants(response.data.candidates);
        } catch (err) {
            setError('Failed to fetch applicants data');
            console.error('Error fetching applicants:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [job_id]);

    const handleSort = (field: keyof Applicant) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleResumeDownload = (resumeFile: string, fileName: string) => {
        // Create a temporary link element to download the file
        const link = document.createElement('a');
        link.href = resumeFile;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredAndSortedApplicants = applicants
        .filter(applicant =>
            applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.degree.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            
            if (aValue === undefined || bValue === undefined) return 0;
            
            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    const getSortIcon = (field: keyof Applicant) => {
        if (sortField !== field) return '↕️';
        return sortDirection === 'asc' ? '↑' : '↓';
    };

    const getScoreColor = (score: number, type: 'resume' | 'oa') => {
        if (type === 'resume') {
            if (score >= 80) return styles.scoreHigh;
            if (score >= 60) return styles.scoreMedium;
            return styles.scoreLow;
        } else {
            if (score >= 80) return styles.scoreHigh;
            if (score >= 60) return styles.scoreMedium;
            return styles.scoreLow;
        }
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading applicants...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.main}>
                <div className={styles.errorContainer}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={fetchApplicants} className={styles.retryButton}>
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    return (
        <Layout>
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Job Applicants Dashboard</h1>
                    <p className={styles.subtitle}>Job ID: {job_id}</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search applicants..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.searchInput}
                        />
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                    <div className={styles.stats}>
                        <span className={styles.statBadge}>
                            Total: {filteredAndSortedApplicants.length}
                        </span>
                    </div>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('name')} className={styles.sortableHeader}>
                                    Name {getSortIcon('name')}
                                </th>
                                <th onClick={() => handleSort('email')} className={styles.sortableHeader}>
                                    Email {getSortIcon('email')}
                                </th>
                                <th onClick={() => handleSort('resumeScore')} className={styles.sortableHeader}>
                                    Resume Score {getSortIcon('resumeScore')}
                                </th>
                                <th onClick={() => handleSort('oaScore')} className={styles.sortableHeader}>
                                    OA Score {getSortIcon('oaScore')}
                                </th>
                                <th>Resume</th>
                                <th onClick={() => handleSort('college')} className={styles.sortableHeader}>
                                    College {getSortIcon('college')}
                                </th>
                                <th onClick={() => handleSort('degree')} className={styles.sortableHeader}>
                                    Degree {getSortIcon('degree')}
                                </th>
                                <th onClick={() => handleSort('experience')} className={styles.sortableHeader}>
                                    Experience {getSortIcon('experience')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedApplicants.map((applicant) => (
                                <tr key={applicant.id} className={styles.tableRow}>
                                    <td className={styles.nameCell}>
                                        <div className={styles.nameContainer}>
                                            <div className={styles.avatar}>
                                                {applicant.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{applicant.name}</span>
                                        </div>
                                    </td>
                                    <td className={styles.emailCell}>{applicant.email}</td>
                                    <td>
                                        {applicant.resumeScore !== undefined ? (
                                            <span className={`${styles.score} ${getScoreColor(applicant.resumeScore, 'resume')}`}>
                                                {applicant.resumeScore}%
                                            </span>
                                        ) : (
                                            <span className={styles.noData}>-</span>
                                        )}
                                    </td>
                                    <td>
                                        {applicant.oaScore !== undefined ? (
                                            <span className={`${styles.score} ${getScoreColor(applicant.oaScore, 'oa')}`}>
                                                {applicant.oaScore}%
                                            </span>
                                        ) : (
                                            <span className={styles.notAttended}>Not attended</span>
                                        )}
                                    </td>
                                    <td>
                                        {applicant.resumeFile ? (
                                            <button
                                                onClick={() => handleResumeDownload(applicant.resumeFile!, applicant.resumeFileName || 'resume.pdf')}
                                                className={styles.downloadButton}
                                            >
                                                📄 Download
                                            </button>
                                        ) : (
                                            <span className={styles.noData}>No file</span>
                                        )}
                                    </td>
                                    <td className={styles.collegeCell}>{applicant.college}</td>
                                    <td className={styles.degreeCell}>{applicant.degree}</td>
                                    <td>
                                        <span className={styles.experienceBadge}>
                                            {applicant.experience} {applicant.experience === 1 ? 'year' : 'years'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAndSortedApplicants.length === 0 && !loading && (
                    <div className={styles.emptyState}>
                        <h3>No applicants found</h3>
                        <p>Try adjusting your search criteria or check back later.</p>
                    </div>
                )}
            </main>
        </Layout>
    );
}