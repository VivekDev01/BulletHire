import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  centered?: boolean;
};

const Layout = ({ children, className, fullWidth = true, centered = false }: Props) => (
  <div className={styles.layoutWrapper}>
    <Header />
    <main className={`
      ${styles.main} 
      ${fullWidth ? styles.fullWidth : ''} 
      ${centered ? styles.centered : ''}
      ${className || ''}
    `}>
      <div className={styles.container}>
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;