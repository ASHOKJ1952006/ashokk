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
import resumePDF from '../assets/ASHOKJ`18.pdf';
import emailjs from '@emailjs/browser';

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

  const skillsRef = useRef(null);
  const audioRef = useRef(null);
  const EMAILJS_SERVICE_ID = 'service_pjg083n';
  const EMAILJS_TEMPLATE_ID = 'template_00845ib';
  const EMAILJS_PUBLIC_KEY = '8lOjTDUoWUCuXIckA';
  // Optional fallback provider (no domain whitelist needed). Get a free key at https://web3forms.com
  const WEB3FORMS_ACCESS_KEY = 'c54a649e-d64c-4966-8b58-efd26bc028bd';

  const toggleModal = () => setShowModal((v) => !v);
  const toggleContact = () => setShowContact((v) => !v);

  // Fake splash/intro
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowSocials(true), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="entry-welcome">
        <div className="entry-card">
          <model-viewer
            src="scene.gltf"
            autoplay
            camera-controls
            loading="eager"
            reveal="auto"
            auto-rotate
            environment-image="neutral"
            camera-orbit="auto auto auto"
            camera-target="auto"
            bounds="tight"
            shadow-softness="0.6"
            background-color="transparent"
            interaction-policy="allow-when-focused"
            exposure="1"
            shadow-intensity="0.6"
            disable-zoom
            className="entry-model"
            onError={() => setModelFailed(true)}
          ></model-viewer>
          <div className="entry-text">
            <div className="entry-title">Welcome to Ashok&apos;s Portfolio</div>
            <div className="entry-sub">{modelFailed ? 'Unable to load model. Check scene.gltf/bin/texture paths.' : 'Preparing your experience…'}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container relative overflow-hidden">
      {/* Animated Background Layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black animate-gradient-xy opacity-80"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-fast"></div>
        <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-blob"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#00ffe7 1px, transparent 1px), linear-gradient(90deg, #00ffe7 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            animation: 'wave 20s linear infinite'
          }}></div>
        </div>
        
        {/* Glowing Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/30 animate-pulse-glow"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
        
        {/* Spinning Rings */}
        <div className="absolute top-1/4 left-1/2 w-96 h-96 border-2 border-cyan-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 border-2 border-teal-500/20 rounded-full animate-spin-medium"></div>
        
        {/* Animated Beams */}
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-float-fast"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-transparent via-teal-500/30 to-transparent animate-float-medium" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Background music (autoplay + loop). Hidden element pinned so it persists */}

      <audio
        ref={audioRef}
        src={bgm}
        autoPlay
        loop
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        style={{ display: 'none' }}
      />
      <div className="particle" />

      {/* --- NAVBAR --- */}
      <header className="navbar relative z-50">
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
            <li><a href="#contact" onClick={(e)=>{e.preventDefault(); toggleContact();}}>Contact</a></li>
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
          <button className="btn-outline" onClick={toggleContact}>Get In Touch</button>
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
        {/* Additional animated background elements for About section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float-slow"></div>
        </div>
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
                <h3>3</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-box">
                <h3>14 days</h3>
                <p>Implant Training</p>
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
    />
  </div>
</div>

        </div>

        {/* floating background bubbles */}
        <div className="floating-bg">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className={`skills-section ${showSkills ? 'reveal' : ''} relative z-10`} ref={skillsRef}>
        {/* Animated background for skills section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-500/10 rounded-full animate-spin-slow"></div>
        </div>
        <div className="floating-bg">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>

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
          <div className="floating-bg">
            <span></span><span></span><span></span>
            <span></span><span></span><span></span>
          </div>

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

        {/* --- BORDER LIGHT ANIMATION --- */}
        <div className="border-light"></div>

        <div className="floating-bg">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>

        <div className="particle"></div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="projects-section relative z-10">
        {/* Animated background for projects section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl animate-float-fast"></div>
          {/* Animated particles specific to projects section */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`project-particle-${i}`}
              className="absolute w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse-glow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="floating-bg">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>

        <h2 className="section-title">Featured Projects</h2>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card">
            <img src={newsImage} alt="News Senti" className="project-image" />
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
            <img src={grocery} alt="Grocery Delivery" className="project-image" />
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
            <img src={reviewImage} alt="Trust Review" className="project-image" />
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
            <img src={ui} alt="KEC Student Portal UI" className="project-image" />
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

        <div className="floating-bg">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </section>

      <div className="music-player">
        <div className="mp-left">
          <img src={cover} alt="cover" className="mp-cover" />
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
