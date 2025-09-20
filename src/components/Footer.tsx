import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SupportIcon from '@mui/icons-material/Support';
import ArticleIcon from '@mui/icons-material/Article';
import HelpIcon from '@mui/icons-material/Help';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import PolicyIcon from '@mui/icons-material/Policy';
import dynamic from "next/dynamic";
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const NewsletterForm = dynamic(() => import("./NewsletterForm/NewsletterForm"), { ssr: false });

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const router = useRouter();
    
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Main Footer Content */}
                <div className={styles.footerContent}>
                    {/* Company Info */}
                    <div className={styles.section}>
                        {/* <div className={styles.logoSection}>
                            <div className={styles.logoIcon}>BH</div>
                            <div className={styles.logoText}>
                                <span className={styles.logoMain}>Bullet</span>
                                <span className={styles.logoAccent}>Hire</span>
                            </div>
                        </div> */}
                        <div className={styles.logo} onClick={() => router.push('/')}>
                            <div className={styles.logoText}>
                            <Image src="/images/logo_cropped.png" alt="Logo" width={40} height={40} className={styles.logoImage} />
                            <Image src="/images/brand.png" alt="Brand Name" width={120} height={60} className={styles.brandName} />
                            </div>
                        </div>
                        <p className={styles.description}>
                            Connecting top talent with amazing opportunities. 
                            Your next career move starts here.
                        </p>
                        <div className={styles.contactInfo}>
                            <div className={styles.contactItem}>
                                <LocationOnIcon className={styles.contactIcon} />
                                <span>Bengaluru, Karnataka, IN</span>
                            </div>
                            <div className={styles.contactItem}>
                                <EmailIcon className={styles.contactIcon} />
                                <span>support@drimsort.com</span>
                            </div>
                            <div className={styles.contactItem}>
                                <PhoneIcon className={styles.contactIcon} />
                                <span>+91-8718836845</span>
                            </div>
                        </div>
                    </div>

                    {/* Job Seekers */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <WorkIcon className={styles.titleIcon} />
                            For Job Seekers
                        </h3>
                        <div className={styles.linkList}>
                            <Link href="/jobs" className={styles.footerLink}>Browse Jobs</Link>
                            <Link href="/companies" className={styles.footerLink}>Browse Companies</Link>
                            <Link href="/salary-guide" className={styles.footerLink}>Salary Guide</Link>
                            <Link href="/career-advice" className={styles.footerLink}>Career Advice</Link>
                            <Link href="/resume-builder" className={styles.footerLink}>Resume Builder</Link>
                            <Link href="/job-alerts" className={styles.footerLink}>Job Alerts</Link>
                        </div>
                    </div>

                    {/* Employers */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <BusinessIcon className={styles.titleIcon} />
                            For Employers
                        </h3>
                        <div className={styles.linkList}>
                            <Link href="/post-job" className={styles.footerLink}>Post a Job</Link>
                            <Link href="/employer-dashboard" className={styles.footerLink}>Employer Dashboard</Link>
                            <Link href="/talent-search" className={styles.footerLink}>Search Talent</Link>
                            <Link href="/pricing" className={styles.footerLink}>Pricing Plans</Link>
                            <Link href="/recruitment-solutions" className={styles.footerLink}>Recruitment Solutions</Link>
                            <Link href="/employer-branding" className={styles.footerLink}>Employer Branding</Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <GroupIcon className={styles.titleIcon} />
                            Company
                        </h3>
                        <div className={styles.linkList}>
                            <Link href="/about" className={styles.footerLink}>About Us</Link>
                            <Link href="/careers" className={styles.footerLink}>Careers</Link>
                            <Link href="/press" className={styles.footerLink}>Press & Media</Link>
                            <Link href="/blog" className={styles.footerLink}>Blog</Link>
                            <Link href="/partnerships" className={styles.footerLink}>Partnerships</Link>
                            <Link href="/investors" className={styles.footerLink}>Investors</Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>
                            <SupportIcon className={styles.titleIcon} />
                            Support
                        </h3>
                        <div className={styles.linkList}>
                            <Link href="/help-center" className={styles.footerLink}>
                                <HelpIcon className={styles.linkIcon} />
                                Help Center
                            </Link>
                            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
                            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
                            <Link href="/community" className={styles.footerLink}>Community</Link>
                            <Link href="/feedback" className={styles.footerLink}>Feedback</Link>
                            <Link href="/report-issue" className={styles.footerLink}>Report Issue</Link>
                        </div>
                    </div>
                </div>

                {/* Social Media & Newsletter */}
                <div className={styles.socialSection}>
                    <div className={styles.socialContent}>
                        <div className={styles.socialLinks}>
                            <h4 className={styles.socialTitle}>Follow Us</h4>
                            <div className={styles.socialIcons}>
                                <a href="https://twitter.com/drimsort" className={styles.socialIcon} aria-label="Twitter">
                                    <TwitterIcon />
                                </a>
                                <a href="https://linkedin.com/company/drimsort" className={styles.socialIcon} aria-label="LinkedIn">
                                    <LinkedInIcon />
                                </a>
                                <a href="https://facebook.com/drimsort" className={styles.socialIcon} aria-label="Facebook">
                                    <FacebookIcon />
                                </a>
                                <a href="https://instagram.com/drimsort" className={styles.socialIcon} aria-label="Instagram">
                                    <InstagramIcon />
                                </a>
                            </div>
                        </div>
                        
                        {/* <div className={styles.newsletter}>
                            <h4 className={styles.newsletterTitle}>Stay Updated</h4>
                            <p className={styles.newsletterText}>Get the latest jobs and career tips delivered to your inbox</p>
                            <div className={styles.newsletterForm}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    className={styles.newsletterInput}
                                />
                                <button className={styles.newsletterButton}>Subscribe</button>
                            </div>
                        </div> */}
                        <NewsletterForm />
                    </div>
                </div>

                {/* Legal & Policies */}
                <div className={styles.legalSection}>
                    <div className={styles.legalContent}>
                        <div className={styles.legalLinks}>
                            <Link href="/privacy-policy" className={styles.legalLink}>
                                <SecurityIcon className={styles.legalIcon} />
                                Privacy Policy
                            </Link>
                            <Link href="/terms-of-service" className={styles.legalLink}>
                                <ArticleIcon className={styles.legalIcon} />
                                Terms of Service
                            </Link>
                            <Link href="/cookie-policy" className={styles.legalLink}>
                                <PolicyIcon className={styles.legalIcon} />
                                Cookie Policy
                            </Link>
                            <Link href="/terms-of-use" className={styles.legalLink}>
                                <GavelIcon className={styles.legalIcon} />
                                Terms of Use
                            </Link>
                            <Link href="/data-protection" className={styles.legalLink}>
                                <SecurityIcon className={styles.legalIcon} />
                                Data Protection
                            </Link>
                            <Link href="/accessibility" className={styles.legalLink}>
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.bottomContent}>
                        <p className={styles.copyright}>
                            © {currentYear} Drimsort. All rights reserved.
                        </p>
                        {/* <div className={styles.bottomLinks}>
                            <span className={styles.madeWith}>
                                Made with ❤️ in Bengaluru
                            </span>
                            <Link href="/sitemap" className={styles.bottomLink}>Sitemap</Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;