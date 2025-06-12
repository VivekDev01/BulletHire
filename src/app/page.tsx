/* === pages/index.tsx === */
import Head from 'next/head';
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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BulletHire | Apply for jobs & Hire Easily</title>
        <meta name="description" content="Find, assess and hire easily" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <span style={{color:"#383838"}}>Bullet</span>
          <span style={{color:"#4184D6"}}>Hire</span>          
          </div>
        <nav className={styles.nav}>
          <a href="#">Become a recruiter</a>
          <a href="#">Good deals</a>
          <a href="#how_it_works">How it work</a>
          <a href="#why_choose_us">Why choose us</a>
        </nav>
        <div className={styles.authButtons}>
          <Link href="/signin">
          <button className={styles.signIn} >Sign in</button>
          </Link>
          <Link href="/signup">
          <button className={styles.signUp}>Sign up</button>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <div className={styles.leftColumnContent}>
            <h1>Find, assess and hire<br />a best candidate <span className={styles.highlight}>Easily</span></h1>
            <p>Plateform to hire candidates using AI automation</p>
            <div className={styles.storeButtons}>
              <img src="/google-play-badge.png" alt="Google Play" />
              <img src="/app-store-badge.png" alt="App Store" />
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <img src="/Header3.png" alt="girl" className={styles.girlImage} />
        </div>
      </main>

      <section id='how_it_works' className={styles.howItWorks}>
      <div className={styles.sectionHeader}>
        <span className={styles.badge}>HOW IT WORK</span>
        <h2>Hire with following 3 working steps</h2>
      </div>

      <div className={styles.steps}>
        <div className={styles.stepBox}>
          <div className={styles.iconBox}>
            <WorkIcon />
          </div>
          <h3>Provide roles</h3>
          <p>Mention the roles that you are looking</p>
        </div>
        <div className={styles.stepBox}>
          <div className={styles.iconBox}>
            <FactCheckIcon />
          </div>
          <h3>Get shortlisted candidates</h3>
          <p>We will assess candidates and pick topmost X for next round</p>
        </div>
        <div className={styles.stepBox}>
          <div className={styles.iconBox}>
            <CalendarMonthIcon />
          </div>
          <h3>Schedule a interview</h3>
          <p>We will schedule a interview for X candidates</p>
        </div>
      </div>

      <div className={styles.stepper}>
        <div className={styles.stepperItem}>
          <div className={styles.stepLine}></div>
          <div className={styles.stepCircle}>1</div>
          <div className={styles.stepLabel}>Step 1</div>  
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepLine}></div>
          <div className={styles.stepCircle}>1</div>
          <div className={styles.stepLabel}>Step 1</div>
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepCircle}>2</div>
          <div className={styles.stepLabel}>Step 2</div>
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepCircle}>3</div>
          <div className={styles.stepLabel}>Step 3</div>
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepCircle}>4</div>
          <div className={styles.stepLabel}>Step 4</div>
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepCircle}>5</div>
          <div className={styles.stepLabel}>Step 5</div>
          <div className={styles.stepLine}></div>
        </div>
        <div className={styles.stepperItem}>
          <div className={styles.stepCircle}>6</div>
          <div className={styles.stepLabel}>Step 6</div>
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
    </div>
  );
}
