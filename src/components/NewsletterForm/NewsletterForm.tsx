"use client";

import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  return (
    <div className={styles.newsletter}>
      <h4 className={styles.newsletterTitle}>Stay Updated</h4>
      <p className={styles.newsletterText}>
        Get the latest jobs and career tips delivered to your inbox
      </p>
      <div className={styles.newsletterForm}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.newsletterInput}
        />
        <button className={styles.newsletterButton}>Subscribe</button>
      </div>
    </div>
  );
}
