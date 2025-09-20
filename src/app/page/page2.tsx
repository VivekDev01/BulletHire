import React, { useState, useEffect } from 'react';
import { 
  Work as WorkIcon, 
  FactCheck as FactCheckIcon, 
  CalendarMonth as CalendarMonthIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  LockOpen as LockOpenIcon,
  Rocket as RocketIcon,
  AutoAwesome as AutoAwesomeIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const BulletHireLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Floating dots animation
  const FloatingDots = () => {
    const dots = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="floating-dot"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
    return <div className="floating-dots">{dots}</div>;
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>BulletHire</h2>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#how_it_works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How it Works</a>
            <a href="#why_choose_us" className="nav-link" onClick={() => setIsMenuOpen(false)}>Features</a>
            <a href="#pricing" className="nav-link" onClick={() => setIsMenuOpen(false)}>Pricing</a>
            <button className="get-started-btn">Get Started</button>
          </div>
          
          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <FloatingDots />
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                🚀 Pune's Premier AI Hiring Platform
              </div>
              <h1 className="hero-title">
                <span className="gradient-text">Find, Assess & Hire</span><br />
                <span className="hero-subtitle">Top Talent Effortlessly</span>
              </h1>
              <p className="hero-description">
                The next-gen AI-powered platform to automate your hiring process.<br />
                Discover, evaluate, and connect with the best candidates in minutes.
              </p>
              <div className="hero-buttons">
                <button className="primary-btn">Get Started</button>
                <button className="secondary-btn">How it Works</button>
              </div>
              <div className="store-badges">
                <img src="/google-play-badge.png" alt="Google Play" className="store-badge" />
                <img src="/app-store-badge.png" alt="App Store" className="store-badge" />
              </div>
            </div>
            <div className="hero-image">
              <div className="image-glow"></div>
              <img src="/Header3.png" alt="AI Hiring Platform" className="hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how_it_works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">HOW IT WORKS</span>
            <h2 className="section-title">Hire in 3 Simple Steps</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">
                <WorkIcon />
              </div>
              <h3>1. Provide Roles</h3>
              <p>Tell us the roles and requirements you are hiring for.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <FactCheckIcon />
              </div>
              <h3>2. Get Shortlisted Candidates</h3>
              <p>Our AI will assess and shortlist the best candidates for you.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">
                <CalendarMonthIcon />
              </div>
              <h3>3. Schedule Interviews</h3>
              <p>Schedule interviews with top candidates easily through our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why_choose_us" className="features-section">
        <div className="section-container">
          <div className="features-content">
            <div className="features-image">
              <div className="image-glow-2"></div>
              <img src="/images/hire_with_ai.jpeg" alt="Hire with AI" className="features-img" />
            </div>
            <div className="features-text">
              <span className="section-badge">WHY CHOOSE US</span>
              <h2 className="section-title">
                We offer the best experience<br />with our platform
              </h2>
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <TipsAndUpdatesIcon />
                  </div>
                  <div className="feature-content">
                    <h4>Smarter Hiring, Simplified</h4>
                    <p>Leverage AI to cut through the noise and find the perfect candidate, every time.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <LockOpenIcon />
                  </div>
                  <div className="feature-content">
                    <h4>Unbiased Talent, Unlocked</h4>
                    <p>Eliminate human bias with AI-driven assessments, ensuring fair and diverse hiring.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <RocketIcon />
                  </div>
                  <div className="feature-content">
                    <h4>Hire Faster, Hire Better</h4>
                    <p>Accelerate your recruitment process with AI that identifies top talent quickly and accurately.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <AutoAwesomeIcon />
                  </div>
                  <div className="feature-content">
                    <h4>Beyond Resumes, True Potential</h4>
                    <p>Discover hidden talent and evaluate skills objectively with our advanced AI analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Recruiter Section */}
      <section className="recruiter-section">
        <div className="section-container">
          <div className="recruiter-content">
            <h2>Become a Recruiter</h2>
            <p>
              Join BulletHire as a recruiter and start finding the best talent effortlessly. 
              Post your job requirements, let our AI shortlist candidates, and streamline your hiring process.
            </p>
            <button className="primary-btn">Create Job Description</button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-badge">PRICING</span>
            <h2 className="section-title">Choose Your Perfect Plan</h2>
            <p className="section-description">Unlock premium features and boost your hiring process with our exclusive deals!</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic Plan</h3>
              <div className="price">₹499</div>
              <p>Post 1 job, shortlist up to 10 candidates</p>
              <button className="secondary-btn">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <h3>Pro Plan</h3>
              <div className="price">₹1,499</div>
              <p>Post 5 jobs, shortlist up to 50 candidates, priority support</p>
              <button className="primary-btn">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">₹2,999</div>
              <p>Unlimited jobs, unlimited candidates, dedicated manager</p>
              <button className="secondary-btn">Get Started</button>
            </div>
          </div>
          <div className="payment-info">
            <p>All payments are securely processed. Upgrade now to access advanced features and streamline your hiring!</p>
            <button className="primary-btn">Go to Payment Page</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #16213e 100%);
          color: #ffffff;
          overflow-x: hidden;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(10, 14, 39, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(59, 130, 246, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }

        .nav-logo h2 {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          color: #e2e8f0;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #3b82f6;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .get-started-btn, .primary-btn {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .get-started-btn:hover, .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.6);
        }

        .secondary-btn {
          background: transparent;
          border: 2px solid #3b82f6;
          color: #3b82f6;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
        }

        .nav-toggle {
          display: none;
          color: #e2e8f0;
          cursor: pointer;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .floating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #3b82f6;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          animation: slideInUp 0.6s ease-out;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          color: #e2e8f0;
          font-weight: 600;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #94a3b8;
          margin-bottom: 2rem;
          animation: slideInUp 1s ease-out 0.4s both;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          animation: slideInUp 1.2s ease-out 0.6s both;
        }

        .store-badges {
          display: flex;
          gap: 1rem;
          animation: slideInUp 1.4s ease-out 0.8s both;
        }

        .store-badge {
          height: 50px;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .store-badge:hover {
          opacity: 1;
        }

        .hero-image {
          position: relative;
          animation: slideInUp 1s ease-out 0.4s both;
        }

        .image-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }

        .hero-img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          position: relative;
          z-index: 1;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.1; }
        }

        /* Section Styles */
        .how-it-works-section,
        .features-section,
        .recruiter-section,
        .pricing-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 4rem 0;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          width: 100%;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #3b82f6;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-description {
          font-size: 1.1rem;
          color: #94a3b8;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Steps Grid */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
        }

        .step-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: white;
        }

        .step-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .step-card p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Features Section */
        .features-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .features-image {
          position: relative;
        }

        .image-glow-2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 4s ease-in-out infinite;
        }

        .features-img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          position: relative;
          z-index: 1;
        }

        .features-text {
          text-align: left;
        }

        .features-text .section-badge {
          margin-bottom: 1rem;
        }

        .features-text .section-title {
          text-align: left;
          margin-bottom: 2rem;
        }

        .features-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3b82f6;
          flex-shrink: 0;
        }

        .feature-content h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .feature-content p {
          color: #94a3b8;
          line-height: 1.6;
        }

        /* Recruiter Section */
        .recruiter-section {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
        }

        .recruiter-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .recruiter-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .recruiter-content p {
          font-size: 1.1rem;
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.7;
        }

        /* Pricing Section */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .pricing-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .pricing-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.3);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.1);
        }

        .pricing-card.featured {
          border: 2px solid #3b82f6;
          transform: scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .pricing-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: #ffffff;
        }

        .price {
          font-size: 2.5rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 1rem;
        }

        .pricing-card p {
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .payment-info {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .payment-info p {
          color: #94a3b8;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(10, 14, 39, 0.98);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            padding: 2rem 0;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(59, 130, 246, 0.1);
          }

          .nav-menu.active {
            left: 0;
          }

          .nav-toggle {
            display: block;
          }

          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }

          .hero-buttons button {
            width: 100%;
            max-width: 300px;
          }

          .features-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .features-text {
            text-align: center;
          }

          .section-title {
            font-size: 2rem;
          }

          .steps-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.featured {
            transform: none;
          }

          .pricing-card:hover {
            transform: translateY(-5px);
          }
        }

        @media (max-width: 480px) {
          .nav-container {
            padding: 1rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .step-card,
          .pricing-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BulletHireLanding;