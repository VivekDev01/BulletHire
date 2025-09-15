'use client'

import { useRef, useEffect } from 'react'
import { motion, useSpring } from 'motion/react'
import styles from './TiltCard.module.css'
import { Button, Tag } from 'antd';
import { MapPin, DollarSign, Users, Calendar, Award } from 'lucide-react';

const springConfig = { stiffness: 150, damping: 20 }

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
    applicants?: string[];
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
};

const parseSkills = (skills?: string) => {
  if (!skills) return [];
  return skills.split(',').map(skill => skill.trim()).filter(Boolean);
};

export default function TiltCard({job}: {job: JobDetails}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateMax = 15

      const deltaX = ((x - centerX) / centerX) * rotateMax
      const deltaY = ((y - centerY) / centerY) * rotateMax

      rotateX.set(-deltaY)
      rotateY.set(deltaX)
    }

    const resetRotation = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    card.addEventListener('pointermove', handlePointerMove)
    card.addEventListener('pointerleave', resetRotation)

    return () => {
      card.removeEventListener('pointermove', handlePointerMove)
      card.removeEventListener('pointerleave', resetRotation)
    }
  }, [rotateX, rotateY])

  const candidateCount = job.applicants?.length || 0;
  const skillsList = parseSkills(job.skills);

  return (
    <div className={styles.cardWrapper}>
      <motion.div
        ref={cardRef}
        className={styles.card}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className={styles.cardContent}>
          <header className={styles.cardHeader}>
            <div className={styles.titleSection}>
              <h2 className={styles.cardTitle}>{job.role}</h2>
              <div className={styles.companyInfo}>
                <span className={styles.companyName}>@{job.user.username}</span>
                <div className={styles.postedDate}>
                  <Calendar size={14} />
                  <span>{formatDate(job.created_at)}</span>
                </div>
              </div>
            </div>
            <div className={styles.candidatesBadge}>
              <Users size={16} />
              <span>{candidateCount}</span>
            </div>
          </header>

          <div className={styles.jobDetails}>
            <div className={styles.detailRow}>
              <div className={styles.detailItem}>
                <MapPin size={16} />
                <span>{job.location}</span>
              </div>
              <div className={styles.detailItem}>
                <Award size={16} />
                <span>{job.experience} Years</span>
              </div>
            </div>

            {job.salary && (
              <div className={styles.salarySection}>
                <DollarSign size={16} />
                <span className={styles.salary}>{job.salary}</span>
              </div>
            )}

            {skillsList.length > 0 && (
              <div className={styles.skillsSection}>
                <div className={styles.skillsContainer}>
                  {skillsList.slice(0, 4).map((skill, index) => (
                    <Tag key={index} className={styles.skillTag}>
                      {skill}
                    </Tag>
                  ))}
                  {skillsList.length > 4 && (
                    <Tag className={styles.moreSkills}>
                      +{skillsList.length - 4} more
                    </Tag>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.cardFooter}>
            <Button 
              type="primary" 
              className={styles.viewJobBtn}
              size="large"
            >
              View Job Dashboard
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}