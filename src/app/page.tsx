'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { 
  Work as WorkIcon,
  FactCheck as FactCheckIcon,
  CalendarMonth as CalendarMonthIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  LockOpen as LockOpenIcon,
  Rocket as RocketIcon,
  AutoAwesome as AutoAwesomeIcon,
  Language as LanguageIcon,
  PhoneAndroid as PhoneAndroidIcon,
  SportsEsports as SportsEsportsIcon,
  Palette as PaletteIcon,
  Storage as StorageIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const particlesContainer = document.querySelector(`.${styles.particles}`);
      if (!particlesContainer) return;
      
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
      }
    };

    // Scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(`.${styles.animateOnScroll}`);
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add(styles.animated);
        }
      });
    };

    // Counter animation
    const animateCounters = () => {
      const counters = document.querySelectorAll(`.${styles.stat} h3`);
      counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            const timer = setInterval(() => {
              current += increment;
              counter.textContent = Math.floor(current) + '+';
              
              if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
              }
            }, 20);
            
            observer.unobserve(counter);
          }
        });
        
        observer.observe(counter);
      });
    };

    // Handle scroll events
    const handleScroll = () => {
      setScrollY(window.scrollY);
      animateOnScroll();
    };

    createParticles();
    animateCounters();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const heroTitles = ['Find, Assess & Hire', 'Discover Top Talent', 'Build Great Teams'];
  const [currentTitle, setCurrentTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % heroTitles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navigation */}
      {/* <nav className={`${styles.navbar} ${scrollY > 100 ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>Drimsort</div>
          <ul className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
            <li><Link href="#home" className={styles.navLink}>Home</Link></li>
            <li><Link href="#about" className={styles.navLink}>About</Link></li>
            <li><Link href="#services" className={styles.navLink}>Services</Link></li>
            <li><Link href="#pricing" className={styles.navLink}>Pricing</Link></li>
            <li><Link href="#contact" className={styles.navLink}>Contact</Link></li>
            <li><Link href="/careers" className={styles.navLink}>
              <WorkIcon fontSize="small" /> Careers
            </Link></li>
          </ul>
          <Link href="#get-started" className={styles.ctaNav}>Get Started</Link>
          <button className={styles.mobileMenuBtn} onClick={toggleMobileMenu}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav> */}

      <Layout>
      <main>
        {/* Hero Section */}
        <section className={styles.hero} id="home">
          <div className={styles.particles}></div>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroGradient}>{heroTitles[currentTitle]}</span><br />
                <span className={styles.heroSubtitle}>Top Talent Effortlessly</span>
              </h1>
              <p className={styles.heroDescription}>
                Building Digital Experiences That Matter. At Drimsort, we turn your hiring challenges into impactful solutions. 
                Specializing in AI-powered recruitment, candidate assessment, talent matching, and streamlined hiring processes.
              </p>
              <div className={styles.heroActions}>
                <Link href="#get-started" className={styles.btnPrimary}>
                  Let&apos;s Build Together <span>→</span>
                </Link>
                <Link href="#how-it-works" className={styles.btnSecondary}>
                  View Our Work
                </Link>
              </div>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <h3>100</h3>
                  <p>Happy Clients</p>
                </div>
                <div className={styles.stat}>
                  <h3>200</h3>
                  <p>Projects Delivered</p>
                </div>
              </div>
            </div>
            <div className={styles.heroVisual}>
              <div className={styles.floatingElements}>
                <div className={styles.floatingIcon}>
                  <TipsAndUpdatesIcon />
                </div>
                <div className={styles.floatingIcon}>
                  <BarChartIcon />
                </div>
                <div className={styles.floatingIcon}>
                  <RocketIcon />
                </div>
              </div>
              {/* <div className={styles.heroImage}>
                <Image src="/images/spotlight.png" alt="Hero Image" layout="fill" objectFit="contain" />
              </div> */}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className={styles.howItWorks} id="how-it-works">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>OUR EXPERTISE</span>
              <h2 className={styles.sectionTitle}>
                We deliver user-focused, scalable, and secure solutions tailored to your business needs.
              </h2>
            </div>
            <div className={styles.stepsGrid}>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <LanguageIcon />
                </div>
                <h3>Talent Discovery</h3>
                <p>Modern, responsive talent sourcing and applications using the latest AI-powered tech stacks.</p>
              </div>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <PhoneAndroidIcon />
                </div>
                <h3>Smart Assessment</h3>
                <p>Native and cross-platform candidate evaluations for exceptional hiring experiences.</p>
              </div>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <SportsEsportsIcon />
                </div>
                <h3>Perfect Matching</h3>
                <p>Immersive talent matching experiences across multiple platforms with stunning precision.</p>
              </div>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <PaletteIcon />
                </div>
                <h3>UI/UX Design</h3>
                <p>User-focused, intuitive designs that enhance engagement and usability.</p>
              </div>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <StorageIcon />
                </div>
                <h3>Enterprise Software</h3>
                <p>Scalable and secure solutions tailored to complex business needs.</p>
              </div>
              <div className={`${styles.stepCard} ${styles.animateOnScroll}`}>
                <div className={styles.stepIcon}>
                  <BarChartIcon />
                </div>
                <h3>Digital Marketing</h3>
                <p>Data-driven strategies to boost your online presence and conversions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features} id="features">
          <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>WHY CHOOSE US</span>
              <h2 className={styles.sectionTitle}>
                We offer the best experience with our platform.
              </h2>
            </div>
          <div className={styles.featuresContainer}>
            <div className={`${styles.featuresContent} ${styles.animateOnScroll}`}>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <TipsAndUpdatesIcon />
                  </div>
                  <div className={styles.featureText}>
                    <h4>Smarter Hiring, Simplified</h4>
                    <p>Leverage AI to cut through the noise and find the perfect candidate, every time.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <LockOpenIcon />
                  </div>
                  <div className={styles.featureText}>
                    <h4>Unbiased Talent, Unlocked</h4>
                    <p>Eliminate human bias with AI-driven assessments, ensuring fair and diverse hiring.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <RocketIcon />
                  </div>
                  <div className={styles.featureText}>
                    <h4>Hire Faster, Hire Better</h4>
                    <p>Accelerate your recruitment process with AI that identifies top talent quickly and accurately.</p>
                  </div>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    <AutoAwesomeIcon />
                  </div>
                  <div className={styles.featureText}>
                    <h4>Beyond Resumes, True Potential</h4>
                    <p>Discover hidden talent and evaluate skills objectively with our advanced AI analysis.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.featuresVisual} ${styles.animateOnScroll}`}>
              <div className={styles.featuresImage}>
                <BarChartIcon style={{ fontSize: '10rem' }} />
                {/* <Image src="/images/hire_with_ai.jpeg" width={500} height={120} alt="Features Visual" /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Recruiter CTA Section */}
        <section className={styles.ctaSection} id="become-recruiter">
          <div className={styles.sectionContainer}>
            <div className={`${styles.ctaContent} ${styles.animateOnScroll}`}>
              <h2>Become a Recruiter</h2>
              <p>
                Join Drimsort as a recruiter and start finding the best talent effortlessly. 
                Post your job requirements, let our AI shortlist candidates, and streamline your hiring process.
              </p>
              <Link href="/create-jd" className={styles.btnPrimary}>
                Create Job Description <span>+</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className={styles.pricing} id="pricing">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>GOOD DEALS</span>
              <h2 className={styles.sectionTitle}>
                Unlock premium features and boost your hiring process
              </h2>
            </div>
            <div className={styles.pricingGrid}>
              <div className={`${styles.pricingCard} ${styles.animateOnScroll}`}>
                <h3>Basic Plan</h3>
                <div className={styles.price}>₹499</div>
                <p>Post 1 job, shortlist up to 10 candidates. Perfect for startups and small businesses.</p>
                <Link href="/payment" className={styles.btnPrimary}>Get Started</Link>
              </div>
              <div className={`${styles.pricingCard} ${styles.featured} ${styles.animateOnScroll}`}>
                <h3>Pro Plan</h3>
                <div className={styles.price}>₹1,499</div>
                <p>Post 5 jobs, shortlist up to 50 candidates, priority support. Ideal for growing companies.</p>
                <Link href="/payment" className={styles.btnPrimary}>Choose Pro</Link>
              </div>
              <div className={`${styles.pricingCard} ${styles.animateOnScroll}`}>
                <h3>Enterprise</h3>
                <div className={styles.price}>₹2,999</div>
                <p>Unlimited jobs, unlimited candidates, dedicated manager. Built for large organizations.</p>
                <Link href="/payment" className={styles.btnPrimary}>Go Enterprise</Link>
              </div>
            </div>
            <div className={`${styles.ctaContent} ${styles.animateOnScroll}`} style={{ marginTop: '3rem' }}>
              <p>All payments are securely processed. Upgrade now to access advanced features and streamline your hiring!</p>
              <Link href="/payment" className={styles.btnSecondary}>Go to Payment Page</Link>
            </div>
          </div>
        </section>
      </main>
      </Layout>
    </>
  );
}