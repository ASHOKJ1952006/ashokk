import React, { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './Home.css';
import profileImage from '../assets/11zon_cropped.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaExternalLinkAlt, FaPhone, FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp, FaVolumeMute, FaJava } from 'react-icons/fa';
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiFigma, SiAdobeillustrator, SiCanva, SiC } from 'react-icons/si';
import newsImage from '../assets/news.jpg';
import reviewImage from '../assets/review.jpeg';
import javaLogo from '../assets/java.png';
import mongoLogo from '../assets/mongo.jpeg';
import grocery from '../assets/grocery.jpeg';
import ui from '../assets/figma.jpeg';
import bgm from '../assets/background.mp3';
import img from '../assets/cropped-desk.jpg';
import cover from '../assets/maxresdefault.jpg';
import resumePDF from '../assets/ASHOK-RESUME.pdf';

const SPLINE_SCENE_URL = 'https://prod.spline.design/pt6uDRUZEbmCnqIO/scene.splinecode';
const SPLINE_PREVIEW_IMAGE = 'data:image/png;base64,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';
const HERO_SPLINE_SCENE_URL = 'https://prod.spline.design/ja64UyWvjVuriUCn/scene.splinecode';

const skillCategories = [
  {
    title: 'Frontend Development',
    skills: [
      { label: 'React', icon: SiReact, color: '#61dafb' },
      { label: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
      { label: 'HTML', icon: SiHtml5, color: '#e34f26' },
      { label: 'CSS', icon: SiCss3, color: '#2965f1' },
      { label: 'Bootstrap', icon: SiBootstrap, color: '#7952b3' },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { label: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
      { label: 'Python', icon: SiPython, color: '#ffd343' },
      { label: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { label: 'MongoDB', icon: SiMongodb, color: '#13aa52' },
    ],
  },
  {
    title: 'UI/UX Design',
    skills: [
      { label: 'Figma', icon: SiFigma, color: '#a259ff' },
      { label: 'Adobe Illustrator', icon: SiAdobeillustrator, color: '#ff9a00' },
      { label: 'Canva', icon: SiCanva, color: '#00c4cc' },
    ],
  },
  {
    title: 'Programming Languages',
    skills: [
      { label: 'C', icon: SiC, color: '#00599c' },
      { label: 'Java', icon: FaJava, color: '#f8981d' },
      { label: 'Python', icon: SiPython, color: '#ffd343' },
      { label: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    ],
  },
];

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
  const splineRef = useRef(null);
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
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    const node = splineRef.current;
    if (!node) return;
    const handleLoad = () => setModelFailed(false);
    const handleError = () => setModelFailed(true);
    node.addEventListener('load', handleLoad);
    node.addEventListener('error', handleError);
    return () => {
      node.removeEventListener('load', handleLoad);
      node.removeEventListener('error', handleError);
    };
  }, [isLoading]);

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
          <div className="entry-spline-wrap">
            {!modelFailed && (
              <div className="entry-spline" ref={splineRef}>
                <Spline
                  scene={SPLINE_SCENE_URL}
                  aria-label="Ashok portfolio 3D intro"
                  onLoad={() => setModelFailed(false)}
                  onError={() => setModelFailed(true)}
                />
              </div>
            )}
            <div className="entry-splash-overlay">
              <p className="entry-splash-text"></p>
              <span className="entry-splash-sub"></span>
            </div>
            {modelFailed && (
              <div className="entry-spline-fallback">
                <h2>Welcome to Ashok&apos;s Portfolio</h2>
                <p>3D intro couldn&apos;t load on this network. The site will appear in a moment.</p>
              </div>
            )}
          </div>
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
        <div className="hero-grid">
          <div className="hero-left">
            <h2 className="hero-title">Hey there, I&apos;m Ashok </h2>
            <h3>Problem Solver • Full Stack Developer • CSE Undergrad</h3>
            <p className="hero-subtext">
              Code. Build. Solve. A Computer Science Engineer exploring the future through technology.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn-primary hover-effect">View My Work</a>
              <a href="#contact" className="btn-outline">Get In Touch</a>
            </div>
          </div>

          <div className="hero-right">
            {!modelFailed ? (
              <Spline
                scene={HERO_SPLINE_SCENE_URL}
                aria-label="Hero 3D scene"
                className="hero-spline"
              />
            ) : (
              <div className="hero-spline-fallback">
                3D preview unavailable on this network.
              </div>
            )}
            <span className="hero-spline-label">AshBot</span>
          </div>
        </div>
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
          {skillCategories.map((category) => (
            <div className="skill-card hover-effect" key={category.title}>
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map(({ label, icon: Icon, color }, skillIdx) => (
                  <li
                    className="skill-item"
                    key={`${category.title}-${label}`}
                    style={{ animationDelay: `${0.1 * (skillIdx + 1)}s` }}
                  >
                    <span className="skill-icon" style={{ color }}>
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="skill-label">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- GLOBAL CERTIFICATIONS --- */}
        <div className="certifications-container fade-in">
          <h3 className="sub-header">📜 Global Certifications</h3>
          <div className="cert-grid">
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
        </div>

        {/* --- HACKATHONS --- */}
        <div className="hackathons-container fade-in">
          <h3 className="sub-header">🏆 Hackathons</h3>
          <div className="hackathon-list">
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
