'use client';

import styles from './page.module.css';

const candidates = [
  { name: 'John Doe', email: 'john@example.com', resumeScore: 85, testScore: 90 },
  { name: 'Jane Smith', email: 'jane@example.com', resumeScore: 92, testScore: 88 },
  { name: 'Ravi Kumar', email: 'ravi@example.com', resumeScore: 78, testScore: 83 },
];

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.jobTitle}>Frontend Developer - Applications</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Resume Score</th>
            <th>Screening Test Score</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.resumeScore}</td>
              <td>{c.testScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
