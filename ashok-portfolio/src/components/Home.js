import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import profileImage from '../assets/11zon_cropped.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaPhone, FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import newsImage from '../assets/news.jpg';
import reviewImage from '../assets/review.jpeg';
import javaLogo from '../assets/java.png';
import mongoLogo from '../assets/mongo.jpeg';
import grocery from '../assets/grocery.jpeg';
import ui from '../assets/figma.jpeg';
import bgm from '../assets/background.mp3';
import img from '../assets/cropped-desk.jpg';
import cover from '../assets/maxresdefault.jpg';
import resumePDF from '../assets/ashokkkkkkk.pdf';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSocials, setShowSocials] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [modelFailed, setModelFailed] = useState(false);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');
  const [navHidden, setNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const skillsRef = useRef(null);
  const audioRef = useRef(null);
  const EMAILJS_SERVICE_ID = 'service_pjg083n';
  const EMAILJS_TEMPLATE_ID = 'template_00845ib';
  const EMAILJS_PUBLIC_KEY = '8lOjTDUoWUCuXIckA';
  // Optional fallback provider (no domain whitelist needed). Get a free key at https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = 'c54a649e-d64c-4966-8b58-efd26bc028bd';

  const toggleModal = () => setShowModal((v) => !v);
  const toggleContact = () => setShowContact((v) => !v);
  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);
  const enableHeavyIntro = (typeof window !== 'undefined') ? window.innerWidth >= 768 : true;

  // Fake splash/intro
  useEffect(() => {
    // If there is a hash in URL (e.g., #contact), skip splash for better navigation
    if (typeof window !== 'undefined' && window.location.hash) {
      setIsLoading(false);
      setTimeout(() => setShowSocials(true), 300);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowSocials(true), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // After loading completes, if a hash exists, scroll into view
  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      const { hash } = window.location;
      if (hash) {
        const el = document.querySelector(hash);
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }, [isLoading]);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (y > lastScrollY && y > 50) {
            setNavHidden(true);
          } else {
            setNavHidden(false);
          }
          setLastScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  // Observe skills section for reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setShowSkills(true);
        });
      },
      { threshold: 0.3 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => {
      if (skillsRef.current) observer.unobserve(skillsRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Note: we pass publicKey via send() options to avoid init ordering issues

  // 3D: using scene.gltf + scene.bin + textures/ from public

  const formatTime = (sec) => {
    if (isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
    setIsPlaying(!audioRef.current.paused);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime || 0);
  };

  const onSeek = (e) => {
    const t = Number(e.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const onChangeVolume = (e) => {
    const v = Number(e.target.value);
    setVolume(v);
  };

  if (isLoading) {
    return (
      <div className="entry-welcome entry-full">
        <div className="entry-hero entry-hero--full">
          <h1 className="entry-title-lg entry-title-center">Welcome to Ashok&apos;s Portfolio</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container relative overflow-hidden">
      {/* Blue Animated Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bg-animated-blue"></div>
        <div className="orb-blue lg anim-delay-1" style={{ top: '12%', left: '8%' }}></div>
        <div className="orb-blue md anim-delay-2" style={{ bottom: '14%', right: '12%' }}></div>
        <div className="orb-blue sm anim-delay-3" style={{ top: '58%', left: '36%' }}></div>
      </div>

      {/* Background music (autoplay + loop). Hidden element pinned so it persists */}
      <audio
        ref={audioRef}
        src={bgm}
        autoPlay
        loop
        preload="metadata"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        style={{ display: 'none' }}
      />

      {/* --- NAVBAR --- */}
      <header className={`navbar relative z-50 ${navHidden ? 'navbar--hidden' : ''}`}>
        <div className="logo-section">
          <img
            src={profileImage}
            alt="Profile"
            className="profile-pic"
            onClick={toggleModal}
            style={{ cursor: 'pointer' }}
            loading="lazy"
            decoding="async"
          />
          <h1 className="logo-text">ASHOK J</h1>
        </div>
        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? 'nav-toggle--open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="nav-wrapper" aria-label="Primary">
          <ul
            id="primary-navigation"
            className={`nav-links ${isMenuOpen ? 'nav-links--open' : ''}`}
          >
            <li><a href="#home" className="active" onClick={closeMenu}>Home</a></li>
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#skills" onClick={closeMenu}>Skills</a></li>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* --- PERSONAL DETAILS MODAL (on profile image click) --- */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> ASHOK J</p>
            <p><strong>Pursuing:</strong> BE-CSE</p>
            <p><strong>College:</strong> Kongu Engineering College</p>
            <p>
              <strong>Gmail:</strong>{' '}
              <a href="mailto:ashokj.23cse@kongu.edu">ashokj.23cse@kongu.edu</a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{' '}
              <a
                href="https://www.linkedin.com/in/ashok-jayaraj123"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/ashok-jayaraj123
              </a>
            </p>
            <p>
              <strong>Phone No:</strong>{' '}
              <a href="tel:9345667718">93456 67718</a>
            </p>
            <button className="btn-close" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {showContact && (
        <div className="modal-overlay" onClick={toggleContact}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Contact Me</h2>
            <form
              className="contact-form"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!formName || !formPhone || !formMessage) {
                  setSendStatus('Please fill all fields.');
                  return;
                }
                setSending(true);
                setSendStatus('');
                try {
                  const params = {
                    // Variables matching your EmailJS template
                    title: 'Portfolio Contact',
                    name: formName,
                    time: new Date().toLocaleString(),
                    message: formMessage,
                    ASHOK: 'ASHOK',
                    email: formEmail,
                    // Extra variables for your reference (not required by template)
                    from_phone: formPhone,
                  };
                  // Dynamically import EmailJS to avoid loading it on first paint
                  const { default: emailjs } = await import('@emailjs/browser');
                  // Single SDK call with public key argument
                  await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    params,
                    { publicKey: EMAILJS_PUBLIC_KEY }
                  );
                  setSendStatus('Message sent successfully.');
                  setFormName('');
                  setFormPhone('');
                  setFormMessage('');
                  setFormEmail('');
                } catch (err) {
                  console.error('EmailJS send error:', err);
                  // Fallback via Web3Forms if access key is provided
                  if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                    try {
                      const resp = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                        body: JSON.stringify({
                          access_key: WEB3FORMS_ACCESS_KEY,
                          subject: 'Portfolio Contact',
                          name: formName,
                          email: formEmail || 'no-email@form.local',
                          message: `${formMessage}\nPhone: ${formPhone}\nTime: ${new Date().toLocaleString()}`,
                        }),
                      });
                      const data = await resp.json();
                      if (data.success) {
                        setSendStatus('Message sent successfully.');
                        setFormName('');
                        setFormPhone('');
                        setFormMessage('');
                        setFormEmail('');
                      } else {
                        throw new Error(data.message || 'Web3Forms failed');
                      }
                    } catch (wErr) {
                      console.error('Web3Forms error:', wErr);
                      setSendStatus(`Failed to send. ${wErr?.message || 'Try again later.'}`);
                    }
                  } else {
                    setSendStatus('Email service blocked by domain policy. Provide a Web3Forms access key to enable fallback.');
                  }
                } finally {
                  setSending(false);
                }
              }}
            >
              <div className="form-row">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="Your email (for reply)"
                />
              </div>
              <div className="form-row">
                <label htmlFor="cf-phone">Contact Number</label>
                <input
                  id="cf-phone"
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  rows="4"
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Your message"
                  required
                />
              </div>
              {sendStatus && (
                <div className="form-status">{sendStatus}</div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn download-cv" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
                <button type="button" className="btn-outline" onClick={toggleContact}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- HERO SECTION --- */}
      <main id="home" className="hero relative z-10">
        <h2 className="hero-title">Hey there, I&apos;m Ashok 👋</h2>
        <h3>Problem Solver • Full Stack Developer • CSE Undergrad</h3>
        <p className="hero-subtext">
          Code. Build. Solve. A Computer Science Engineer exploring the future through technology.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn-primary hover-effect">View My Work</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>

        {/* Social icons row */}
        

        
      </main>

      {/* --- SOCIAL CARDS SECTION --- */}
      <section className="social-cards-section relative z-10">
        <div className="card-grid">
          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            <FaLinkedin className="social-icon linkedin" />
            <h3>LinkedIn</h3>
            <p>Professional Network</p>
            <a
              href="https://www.linkedin.com/in/ashok-jayaraj123"
              target="_blank"
              rel="noreferrer"
            >
              CONNECT
            </a>
          </div>

          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            <FaGithub className="social-icon github" />
            <h3>GitHub</h3>
            <p>Code Repositories</p>
            <a
              href="https://github.com/ASHOKJ1952006"
              target="_blank"
              rel="noreferrer"
            >
              FOLLOW
            </a>
          </div>

          <div className={`social-card ${showSocials ? 'animate' : ''}`}>
            <span className="social-icon leetcode">🧠</span>
            <h3>LeetCode</h3>
            <p>Problem Solving</p>
            <a
              href="https://leetcode.com/u/Ashok_jayaraj/"
              target="_blank"
              rel="noreferrer"
            >
              PRACTICE
            </a>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="about-section relative z-10">
        <h2 className="section-header">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I&apos;m a passionate Computer Science and Engineering student with a keen
              interest in building real-world tech solutions. I enjoy exploring the
              full stack — from crafting responsive frontends to designing efficient
              backend systems.
            </p>
            <p>
              I believe in continuous learning, teamwork, and writing code that not
              only works but also makes a difference.
            </p>
            <div className="about-stats">
              <div className="stat-box">
                <h3>4+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-box">
                <h3>2</h3>
                <p>Certifications completed</p>
              </div>
              <div className="stat-box">
                <h3>7.99</h3>
                <p>CGPA</p>
              </div>
            </div>
            <div className="about-actions" style={{ marginTop: '1rem' }}>
              <a href={resumePDF} download className="btn download-cv">Download CV</a>
            </div>
          </div>
          <div className="about-emoji">
  <div className="">
            <img 
              src={img}
              alt="Logo"
              style={{ width: "300px", height: "300px", borderRadius: "50%" }}
              loading="lazy"
              decoding="async"
            />
  </div>
</div>

        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className={`skills-section ${showSkills ? 'reveal' : ''} relative z-10`} ref={skillsRef}>
        <h2 className="section-header">Skills &amp; Expertise</h2>

        <div className="skills-cards">
          <div className="skill-card hover-effect">
            <h3>Frontend Development</h3>
            <ul>
              <li>React</li><li>JavaScript</li><li>HTML</li><li>CSS</li><li>Bootstrap</li>
            </ul>
          </div>

          <div className="skill-card hover-effect">
            <h3>Backend Development</h3>
            <ul>
              <li>Node.js</li><li>Python</li><li>PostgreSQL</li><li>MongoDB</li>
            </ul>
          </div>

          <div className="skill-card hover-effect">
            <h3>UI/UX Design</h3>
            <ul>
              <li>Figma</li><li>Adobe Illustrator</li><li>Canva</li>
            </ul>
          </div>

          <div className="skill-card hover-effect">
            <h3>Programming Languages</h3>
            <ul>
              <li>C</li><li>Java</li><li>Python</li><li>JavaScript</li>
            </ul>
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
          </div>

          {/* --- HACKATHONS --- */}
          <div className="hackathons-container fade-in">
            <h3 className="sub-header">🏆 Hackathons</h3>

            <div className="hackathon-card">
              <h4>HACKNOVATE&apos;25 - CSD Department</h4>
              <p><strong>Project:</strong> KEC Student Portal UI Design</p>
              <p><strong>Prize:</strong> 🥈 2nd Place</p>
              <a
                href="https://lnkd.in/dunWT4rT"
                target="_blank"
                rel="noreferrer"
              >
                View Figma Page
              </a>
            </div>
            <div className="hackathon-card">
              <h4>ALGORENA&apos;25 - CSE Department</h4>
              <p><strong>Project:</strong> Civic Issue Reporting and Resolving</p>
              <p><strong>Prize:</strong> 🥈 2nd Place</p>
              <a
                href="https://github.com/Bharani-dharan-k/civic-main"
                target="_blank"
                rel="noreferrer"
              >
                Github Repo
              </a>
            </div>

            <div className="hackathon-card">
              <h4>AI Bytes Hackathon by BYTS</h4>
              <p><strong>Project:</strong> Unmasking Fake Reviews using AI</p>
              <a
                href="https://github.com/Bharani-dharan-k/Trust-Review.git"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub Repo
              </a>
            </div>
          </div>
        </div>

        <h3 className="tech-title">Technical Proficiency</h3>

        <div className="progress-bars">
          <div className="bar">
            <span>JavaScript</span>
            <div className="progress">
              <div className="filled" style={{ width: '90%' }}></div>
              <span className="percent">90%</span>
            </div>
          </div>

          <div className="bar">
            <span>Node.js, React</span>
            <div className="progress">
              <div className="filled" style={{ width: '85%' }}></div>
              <span className="percent">85%</span>
            </div>
          </div>

          <div className="bar">
            <span>HTML, CSS, Bootstrap</span>
            <div className="progress">
              <div className="filled" style={{ width: '85%' }}></div>
              <span className="percent">85%</span>
            </div>
          </div>

          <div className="bar">
            <span>Java</span>
            <div className="progress">
              <div className="filled" style={{ width: '85%' }}></div>
              <span className="percent">85%</span>
            </div>
          </div>

          <div className="bar">
            <span>UI/UX Design</span>
            <div className="progress">
              <div className="filled" style={{ width: '90%' }}></div>
              <span className="percent">90%</span>
            </div>
          </div>

          <div className="bar">
            <span>C, Python</span>
            <div className="progress">
              <div className="filled" style={{ width: '90%' }}></div>
              <span className="percent">90%</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="projects-section relative z-10">
        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <img src={newsImage} alt="News Senti" className="project-image" loading="lazy" decoding="async" />
            <div className="project-content">
              <h3>News-Sentiment Analyser</h3>
              <p>
                News Headline Sentiment Analysis using NLP and Machine Learning.
                It classifies headlines into Positive, Negative, or Neutral.
              </p>
              <div className="tags">
                <span>NLP</span>
                <span>Streamlit</span>
                <span>Python</span>
                <span>Scikit-Learn</span>
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/Bharani-dharan-k/News-Senti.git"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project-card">
            <img src={grocery} alt="Grocery Delivery" className="project-image" loading="lazy" decoding="async" />
            <div className="project-content">
              <h3>Grocery Delivery Website</h3>
              <p>
                Web app for users to browse grocery stores, place orders, and get deliveries to their doorstep.
              </p>
              <div className="tags">
                <span>React</span>
                <span>MongoDB</span>
                <span>JavaScript</span>
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/ASHOKJ1952006/Grocessory-delivery-website.git"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="project-card">
            <img src={reviewImage} alt="Trust Review" className="project-image" loading="lazy" decoding="async" />
            <div className="project-content">
              <h3>Trust-Review</h3>
              <p>
                AI-powered fake review detection using ML, language detection, and sentiment analysis to ensure review authenticity.
              </p>
              <div className="tags">
                <span>React.js</span>
                <span>Flask</span>
                <span>XGBoost</span>
                <span>TextBlob</span>
                <span>Langdetect</span>
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/Bharani-dharan-k/Trust-Review.git"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div className="project-card">
            <img src={ui} alt="KEC Student Portal UI" className="project-image" loading="lazy" decoding="async" />
            <div className="project-content">
              <h3>KEC Student Portal</h3>
              <p>
                Student portal UI in Figma with fees, results, LinkedIn integration, and a community to connect juniors and seniors.
              </p>
              <div className="tags">
                <span>UI/UX</span>
                <span>Figma</span>
              </div>
              <div className="project-links">
                <a
                  href="https://www.figma.com/design/jz1EEmJRWVajwu8GQvTm4p/HACKATHON?node-id=69-2&t=WLQmHaiG7cdZ3e3a-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT FOOTER SECTION --- */}
      <section id="contact" className="contact-section relative z-10">
        <div className="section-bg">
          <div className="bg-animated-blue"></div>
          <div className="orb-blue md anim-delay-1" style={{ top: '10%', left: '10%' }}></div>
          <div className="orb-blue sm anim-delay-2" style={{ bottom: '8%', right: '15%' }}></div>
        </div>

        <div className="contact-wrapper">
          <div className="contact-header">
            <p className="contact-eyebrow">Let&apos;s Connect</p>
            <h2 className="section-header">Get In Touch</h2>
            <p className="contact-subtext">
              Have a freelance requirement, internship opportunity, or product idea? Drop a quick note and I&apos;ll respond within 24 hours.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-card-icon email">
                  <FaEnvelope />
                </div>
                <h3>Email</h3>
                <p>Share context or files anytime.</p>
                <a href="mailto:ashokj.23cse@kongu.edu" className="contact-card-link">ashokj.23cse@kongu.edu</a>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon phone">
                  <FaPhone />
                </div>
                <h3>Call / WhatsApp</h3>
                <p>Reach me 9 AM – 6 PM IST.</p>
                <a href="tel:9345667718" className="contact-card-link">+91 93456 67718</a>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon linkedin">
                  <FaLinkedin />
                </div>
                <h3>LinkedIn</h3>
                <p>Let&apos;s grow our professional network.</p>
                <a
                  href="https://www.linkedin.com/in/ashok-jayaraj123"
                  className="contact-card-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/ashok-jayaraj123
                </a>
              </div>
            </div>

            <div className="contact-form-card">
              <h3>Send a Message</h3>
              <p className="contact-form-note">I usually respond within a day. Required fields are marked with *.</p>
              <form
                className="contact-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!formName || !formPhone || !formMessage) {
                    setSendStatus('Please fill all fields.');
                    return;
                  }
                  setSending(true);
                  setSendStatus('');
                  try {
                    const params = {
                      title: 'Portfolio Contact',
                      name: formName,
                      time: new Date().toLocaleString(),
                      message: formMessage,
                      ASHOK: 'ASHOK',
                      email: formEmail,
                      from_phone: formPhone,
                    };
                    const { default: emailjs } = await import('@emailjs/browser');
                    await emailjs.send(
                      EMAILJS_SERVICE_ID,
                      EMAILJS_TEMPLATE_ID,
                      params,
                      { publicKey: EMAILJS_PUBLIC_KEY }
                    );
                    setSendStatus('Message sent successfully.');
                    setFormName('');
                    setFormPhone('');
                    setFormMessage('');
                    setFormEmail('');
                  } catch (err) {
                    console.error('EmailJS send error:', err);
                    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                      try {
                        const resp = await fetch('https://api.web3forms.com/submit', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                          body: JSON.stringify({
                            access_key: WEB3FORMS_ACCESS_KEY,
                            subject: 'Portfolio Contact',
                            name: formName,
                            email: formEmail || 'no-email@form.local',
                            message: `${formMessage}\nPhone: ${formPhone}\nTime: ${new Date().toLocaleString()}`,
                          }),
                        });
                        const data = await resp.json();
                        if (data.success) {
                          setSendStatus('Message sent successfully.');
                          setFormName('');
                          setFormPhone('');
                          setFormMessage('');
                          setFormEmail('');
                        } else {
                          throw new Error(data.message || 'Web3Forms failed');
                        }
                      } catch (wErr) {
                        console.error('Web3Forms error:', wErr);
                        setSendStatus(`Failed to send. ${wErr?.message || 'Try again later.'}`);
                      }
                    } else {
                      setSendStatus('Email service blocked by domain policy. Provide a Web3Forms access key to enable fallback.');
                    }
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <div className="form-row">
                  <label htmlFor="footer-name">Name *</label>
                  <input
                    id="footer-name"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="footer-email">Email</label>
                  <input
                    id="footer-email"
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="Your email (for reply)"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="footer-phone">Contact Number *</label>
                  <input
                    id="footer-phone"
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="Your phone number"
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="footer-message">Message *</label>
                  <textarea
                    id="footer-message"
                    rows="4"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Your message"
                    required
                  />
                </div>
                {sendStatus && (
                  <div className="form-status">{sendStatus}</div>
                )}
                <div className="form-actions">
                  <button type="submit" className="btn download-cv" disabled={sending}>
                    {sending ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="music-player">
        <div className="mp-left">
          <img src={cover} alt="cover" className="mp-cover" loading="lazy" decoding="async" />
          <div className="mp-meta">
            <div className="mp-title">Background Track</div>
            <div className="mp-sub">BLUE</div>
          </div>
        </div>
        <div className="mp-center">
          <div className="mp-controls">
            <button className="mp-btn" aria-label="prev" disabled>
              <FaStepBackward />
            </button>
            <button className="mp-btn mp-primary" aria-label="play-pause" onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="mp-btn" aria-label="next" disabled>
              <FaStepForward />
            </button>
          </div>
          <div className="mp-timeline">
            <span className="mp-time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="1"
              value={currentTime}
              onChange={onSeek}
              className="mp-seek"
            />
            <span className="mp-time">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="mp-right">
          {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={onChangeVolume}
            className="mp-volume"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
