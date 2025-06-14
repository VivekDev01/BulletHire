import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer style={{ background: '#55767A', padding: '1rem', textAlign: 'center' }}>
      <p>© {currentYear} BulletHire</p>
    </footer>
  );
};

export default Footer;
