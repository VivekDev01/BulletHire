import styles from './page.module.css';
import Image from 'next/image';
import WorkIcon from '@mui/icons-material/Work';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import RocketIcon from '@mui/icons-material/Rocket';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import Layout from '@/components/Layout';
import React from 'react';

export default function Home() {
  return (
    <Layout>
      <main className={styles.mainHero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTextBlock}>
            <h1 className={styles.heroTitle}>
              <span className={styles.heroGradient}>Find, Assess & Hire</span><br />
              <span className={styles.heroSubTitle}>Top Talent Effortlessly</span>
            </h1>
            <p className={styles.heroDesc}>
              The next-gen AI-powered platform to automate your hiring process.<br />
              Discover, evaluate, and connect with the best candidates in minutes.
            </p>
            <div className={styles.heroActions}>
              <Link href="/signup">
                <button className={styles.ctaButton}>Get Started</button>
              </Link>
              <Link href="#how_it_works">
                <button className={styles.secondaryButton}>How it Works</button>
              </Link>
            </div>
            <div className={styles.storeButtons}>
              <img src="/google-play-badge.png" alt="Google Play" />
              <img src="/app-store-badge.png" alt="App Store" />
            </div>
          </div>
          <div className={styles.heroImageBlock}>
            <div className={styles.heroImageBg}></div>
            <img src="/Header3.png" alt="girl" className={styles.heroImage} />
          </div>
        </div>
      </main>

      <section id="how_it_works" className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <span className={styles.badge}>HOW IT WORKS</span>
          <h2>Hire in 3 Simple Steps</h2>
        </div>
        <div className={styles.steps}>
          <div className={styles.stepBox}>
            <div className={styles.iconBox}><WorkIcon /></div>
            <h3>1. Provide Roles</h3>
            <p>Tell us the roles and requirements you are hiring for.</p>
          </div>
          <div className={styles.stepBox}>
            <div className={styles.iconBox}><FactCheckIcon /></div>
            <h3>2. Get Shortlisted Candidates</h3>
            <p>Our AI will assess and shortlist the best candidates for you.</p>
          </div>
          <div className={styles.stepBox}>
            <div className={styles.iconBox}><CalendarMonthIcon /></div>
            <h3>3. Schedule Interviews</h3>
            <p>Schedule interviews with top candidates easily through our platform.</p>
          </div>
        </div>
      </section>

      <section id='why_choose_us' className={styles.container2}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/hire_with_ai.jpeg"
            alt="Hire with AI"
            layout="intrinsic"
            width={500}
            height={200}
            className={styles.girlImage2}
          />
        </div>

        <div className={styles.textContent}>
          <button className={styles.tag}>WHY CHOOSE US</button>
          <h2 className={styles.title}>
            We offer the best experience <br /> with our platform
          </h2>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <div className={styles.iconBox2}>
                <TipsAndUpdatesIcon />
              </div>
              <div className={styles.titleBox}>
                <h4>Smarter Hiring, Simplified</h4>
                <p>Leverage AI to cut through the noise and find the perfect candidate, every time.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.iconBox2}>
                <LockOpenIcon />
              </div>
              <div className={styles.titleBox}>
                <h4>Unbiased Talent, Unlocked</h4>
                <p>Eliminate human bias with AI-driven assessments, ensuring fair and diverse hiring.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.iconBox2}>
                <RocketIcon />
              </div>
            <div className={styles.titleBox}>
                <h4>Hire Faster, Hire Better</h4>
                <p>Accelerate your recruitment process with AI that identifies top talent quickly and accurately.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.iconBox2}>
                <AutoAwesomeIcon />
              </div>
              <div className={styles.titleBox}>
                <h4>Beyond Resumes, True Potential</h4>
                <p>Discover hidden talent and evaluate skills objectively with our advanced AI analysis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="become_recruiter" className={styles.becomeRecruiterSection}>
        <div className={styles.becomeRecruiterContent}>
          <h2>Become a Recruiter</h2>
          <p>
            Join BulletHire as a recruiter and start finding the best talent effortlessly. 
            Post your job requirements, let our AI shortlist candidates, and streamline your hiring process.
          </p>
          <Link href="/create-jd" className={styles.becomeRecruiterLink}>
            <button className={styles.becomeRecruiterButton}>
              Create Job Description
            </button>
          </Link>
        </div>
      </section>

      <section id="good_deals" className={styles.goodDealsSection}>
        <div className={styles.goodDealsContent}>
          <h2>Good Deals</h2>
          <p>Unlock premium features and boost your hiring process with our exclusive deals!</p>
          <div className={styles.dealsTable}>
            <div className={styles.dealRow}>
              <span className={styles.dealName}>Basic Plan</span>
              <span className={styles.dealPrice}>₹499</span>
              <span className={styles.dealDesc}>Post 1 job, shortlist up to 10 candidates</span>
            </div>
            <div className={styles.dealRow}>
              <span className={styles.dealName}>Pro Plan</span>
              <span className={styles.dealPrice}>₹1499</span>
              <span className={styles.dealDesc}>Post 5 jobs, shortlist up to 50 candidates, priority support</span>
            </div>
            <div className={styles.dealRow}>
              <span className={styles.dealName}>Enterprise</span>
              <span className={styles.dealPrice}>₹2999</span>
              <span className={styles.dealDesc}>Unlimited jobs, unlimited candidates, dedicated manager</span>
            </div>
          </div>
          <div className={styles.paymentInfo}>
            <p>All payments are securely processed. Upgrade now to access advanced features and streamline your hiring!</p>
          </div>
          <Link href="/payment" className={styles.paymentLink}>
            <button className={styles.paymentButton}>Go to Payment Page</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
