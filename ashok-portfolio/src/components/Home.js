import './Home.css';
import profileImage from '../assets/11zon_cropped.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaPhone } from 'react-icons/fa';
import newsImage from '../assets/news.jpg';
import reviewImage from '../assets/review.jpeg';
import javaLogo from '../assets/java.png';
import mongoLogo from '../assets/mongo.jpeg';
import grocery from '../assets/grocery.jpeg';
import ui from '../assets/figma.jpeg';
import bgm from '../assets/background.mp3';



import React, { useEffect, useState, useRef } from 'react';


const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSocials, setShowSocials] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const skillsRef = useRef(null);
  

  
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleContact = () => {
    setShowContact(!showContact);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowSocials(true), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowSkills(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader-text">Welcome to Ashok's Portfolio</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="particle"></div>

      {/* --- NAVBAR --- */}
      <header className="navbar">
        <div className="logo-section">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-pic"
            onClick={toggleModal}
            style={{ cursor: 'pointer' }}
          />
          <h1 className="logo-text">ASHOK J</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ASHOK J</p>
            <p><strong>Pursuing:</strong> BE-CSE</p>
            <p><strong>College:</strong> Kongu Engineering College</p>
            <p><strong>Gmail:</strong> <a href="mailto:ashokj.23cse@kongu.edu">ashokj.23cse@kongu.edu</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/ashok-jayaraj123" target="_blank" rel="noreferrer">linkedin.com/in/ashok-jayaraj123</a></p>
            <p><strong>Phone No:</strong> <a href="tel:9345667718">93456 67718</a></p>
            <button className="btn-close" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {showContact && (
        <div className="modal-overlay" onClick={toggleContact}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Contact Me</h2>
            <p><FaEnvelope /> Email: <a href="mailto:ashokj.23cse@kongu.edu">ashokj.23cse@kongu.edu</a></p>
            <p><FaPhone /> Phone: <a href="tel:9345667718">93456 67718</a></p>
            <p><FaLinkedin /> LinkedIn: <a href="https://www.linkedin.com/in/ashok-jayaraj123" target="_blank" rel="noreferrer">linkedin.com/in/ashok-jayaraj123</a></p>
            <p><FaGithub /> GitHub: <a href="https://github.com/ASHOKJ1952006" target="_blank" rel="noreferrer">github.com/ASHOKJ1952006</a></p>
            <button className="btn-close" onClick={toggleContact}>Close</button>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <main id="home" className="hero">
        <h2 className="hero-title">Hey there, I'm Ashok 👋</h2>
        <h3>Problem Solver • Full Stack Developer • CSE Undergrad</h3>
        <p className="hero-subtext">Code. Build. Solve. A Computer Science Engineer exploring the future through technology.</p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary hover-effect">View My Work</a>
          <button className="btn-outline" onClick={toggleContact}>Get In Touch</button>
        </div>
      </main>

      {/* --- SOCIAL CARDS SECTION --- */}
      <section className="social-cards-section">
        <div className="card-grid">
          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            
            <FaLinkedin className="social-icon linkedin" />
            <h3>LinkedIn</h3>
            <p>Professional Network</p>
            <a href="https://www.linkedin.com/in/ashok-jayaraj123" target="_blank" rel="noreferrer">CONNECT</a>
          </div>
          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            <FaGithub className="social-icon github" />
            <h3>GitHub</h3>
            <p>Code Repositories</p>
            <a href="https://github.com/ASHOKJ1952006" target="_blank" rel="noreferrer">FOLLOW</a>
          </div>
          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            <span className="social-icon leetcode">🧠</span>
            <h3>LeetCode</h3>
            <p>Problem Solving</p>
            <a href="https://leetcode.com/u/Ashok_jayaraj/" target="_blank" rel="noreferrer">PRACTICE</a>
          </div>
        </div>
        
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-section">
        <h2 className="section-header">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>I'm a passionate Computer Science and Engineering student with a keen interest in building real-world tech solutions. I enjoy exploring the full stack — from crafting responsive frontends to designing efficient backend systems.</p>
            <p>I believe in continuous learning, teamwork, and writing code that not only works but also makes a difference.</p>
            <div className="about-stats">
              <div className="stat-box"><h3>3</h3><p>Projects Completed</p></div>
              <div className="stat-box"><h3>14 days</h3><p>Implant Training</p></div>
              <div className="stat-box"><h3>7.91</h3><p>CGPA</p></div>
            </div>
          </div>
          <div className="about-emoji">
            <div className="emoji-circle">👨‍💻</div>
          </div>
        </div>
        <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="skills-section">
        <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
        <h2 className="section-header">Skills & Expertise</h2>
        <div className="skills-cards">
          <div className="skill-card hover-effect">
            <h3>Frontend Development</h3>
            <ul><li>React</li><li>JavaScript</li><li>HTML</li><li>CSS</li><li>Bootstrap</li></ul>
          </div>
          <div className="skill-card hover-effect">
            <h3>Backend Development</h3>
            <ul><li>Node.js</li><li>Python</li><li>PostgreSQL</li><li>MongoDB</li></ul>
          </div>
          <div className="skill-card hover-effect">
            <h3>UI/UX Design</h3>
            <ul><li>Figma</li><li>Adobe Illustrator</li><li>Canva</li></ul>
          </div>
          <div className="skill-card hover-effect">
            <h3>Programming Languages</h3>
            <ul><li>C</li><li>Java</li><li>Python</li><li>JavaScript</li></ul>
          </div>
          {/* --- GLOBAL CERTIFICATIONS --- */}
<div className="certifications-container fade-in">
  <h3 className="sub-header">📜 Global Certifications</h3>
  <div className="cert-card">
    <img src={javaLogo} alt="Java SE17" className="cert-logo" />
    <div>
      <h4>Java SE17 Developer</h4>
      <p>Oracle Certified</p>
    </div>
  </div>
  <div className="cert-card">
    <img src={mongoLogo} alt="MongoDB Node.js" className="cert-logo" />
    <div>
      <h4>MongoDB Node.js Associate Developer</h4>
      <p>Certification Credential</p>
    </div>
  </div>
  <div className="particle"></div>
  <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
</div>

{/* --- HACKATHONS --- */}
<div className="hackathons-container fade-in">
  return (  
    <audio
  src={bgm}
  autoPlay
  loop
  controls
  style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}
/>

  <h3 className="sub-header">🏆 Hackathons</h3>
  <div className="hackathon-card">
    <h4>HACKNOVATE'25 - CSD Department</h4>
    <p><strong>Project:</strong> KEC Student Portal UI Design</p>
    <p><strong>Prize:</strong> 🥈 2nd Place</p>
    <a href="https://lnkd.in/dunWT4rT" target="_blank" rel="noreferrer">View Figma Page</a>
  </div>
  <div className="hackathon-card">
    <h4>AI Bytes Hackathon by BYTS</h4>
    <p><strong>Project:</strong> Unmasking Fake Reviews using AI</p>
    <a href="https://github.com/Bharani-dharan-k/Trust-Review.git" target="_blank" rel="noreferrer">View GitHub Repo</a>
  </div>
</div>
<div className="particle"></div>
        </div>

        <h3 className="tech-title">Technical Proficiency</h3>

        <div className="progress-bars">
          <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
          <div className="bar"><span>JavaScript</span><div className="progress"><div className="filled" style={{ width: '90%' }}></div><span className="percent">90%</span></div></div>
          <div className="bar"><span>Node.js,React</span><div className="progress"><div className="filled" style={{ width: '85%' }}></div><span className="percent">85%</span></div></div>
          <div className="bar"><span>Html,CSS,Bootstrap</span><div className="progress"><div className="filled" style={{ width: '85%' }}></div><span className="percent">85%</span></div></div>
          <div className="bar"><span>Java</span><div className="progress"><div className="filled" style={{ width: '85%' }}></div><span className="percent">85%</span></div></div>
          <div className="bar"><span>UI/UX Design</span><div className="progress"><div className="filled" style={{ width: '90%' }}></div><span className="percent">90%</span></div></div>
          <div className="bar"><span>c,python</span><div className="progress"><div className="filled" style={{ width: '90%' }}></div><span className="percent">90%</span></div></div>
        </div>
        {/* --- BORDER LIGHT ANIMATION --- */}
<div className="border-light"></div>
<div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
<div className="particle"></div>
      </section>



      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="projects-section">
        <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <img src={newsImage} alt="News Senti" className="project-image" />
            <div className="project-content">
              <h3>News-Sentiment Analyser</h3>
              <p>News Headline Sentiment Analysis using NLP and Machine Learning. It classifies headlines into Positive, Negative, or Neutral.</p>
              <div className="tags">
                <span>NLP</span><span>Streamlit</span><span>Python</span><span>Scikit-Learn</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Bharani-dharan-k/News-Senti.git" target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                <a href="https://github.com/Bharani-dharan-k/News-Senti.git" target="_blank" rel="noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img src={grocery} alt="News Senti" className="project-image" />
            <div className="project-content">
              <h3>Grocesory Delivery Website</h3>
              <p>Develop a web or mobile app for users to browse grocery stores,
place orders, and get deliveries to their doorstep.</p>
              <div className="tags">
                <span>React app</span><span>MongoDB</span><span>javascript</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/ASHOKJ1952006/Grocessory-delivery-website.git" target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                <a href="https://github.com/ASHOKJ1952006/Grocessory-delivery-website.git" target="_blank" rel="noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </div>

          

          <div className="project-card">
            <img src={reviewImage} alt="Trust Review" className="project-image" />
            <div className="project-content">
              <h3>Trust-Review</h3>
              <p>AI-powered fake review detection using ML, language detection, and sentiment analysis to ensure review authenticity.</p>
              <div className="tags">
                <span>React.js</span><span>Flask</span><span>XGBoost</span><span>TextBlob</span><span>Langdetect</span>
              </div>
              <div className="project-links">
                <a href="https://github.com/Bharani-dharan-k/Trust-Review.git" target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                <a href="https://github.com/Bharani-dharan-k/Trust-Review.git" target="_blank" rel="noreferrer"><FaGithub /> Code</a>
              </div>
            </div>
          </div>
          <div className="project-card">
            <img src={ui} alt="News Senti" className="project-image" />
            <div className="project-content">
              <h3>KEC student Portal</h3>
              <p>our college student portal UI design using figma with all necessary things like fees payment,result. and also add some interactive thing like linkedin, and also community to build connection between juniors and seniors</p>
              <div className="tags">
                <span>UI/UX</span><span>FIGMA</span>
              </div>
              <div className="project-links">
                <a href="https://www.figma.com/design/jz1EEmJRWVajwu8GQvTm4p/HACKATHON?node-id=69-2&t=WLQmHaiG7cdZ3e3a-1" target="_blank" rel="noreferrer"><FaExternalLinkAlt /> Live Demo</a>
                
              </div>
            </div>
          </div>
        </div>
        <div className="floating-bg">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
        
      </section>
      

    </div>
    
    
  );
};

export default Home;
