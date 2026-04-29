import React, { useEffect, useRef, useState } from 'react';
import stgLogo from './stg-logo.png';
import phoenixImg from './assets/phoenix.jpg';
import jokerImg from './assets/joker.jpg';
import './App.css';

// ─── BACKEND API CONFIG ───────────────────────────────────────────────────────
const CONTACT_API_URL = '/stg_app/contact/';

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { num: '01', name: 'Web Development', img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=75&auto=format&fit=crop', desc: 'Scalable web applications built with React, Next.js, and modern frameworks for seamless user experiences.' },
  { num: '02', name: 'Android & iOS Apps', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=75&auto=format&fit=crop', desc: 'Cross-platform mobile solutions using Flutter and React Native, crafted for performance and elegance.' },
  { num: '03', name: 'IoT Solutions', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&auto=format&fit=crop', desc: 'Smart connected systems — GPS tracking, home automation, and industrial control for the modern enterprise.' },
  { num: '04', name: 'Backend & DevOps', img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=75&auto=format&fit=crop', desc: 'RESTful APIs, Docker, Kubernetes, and CI/CD pipelines delivering robust, scalable infrastructure.' },
  { num: '05', name: 'Digital Marketing', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=75&auto=format&fit=crop', desc: 'Data-driven SEO, SEM, and social media strategies that drive measurable growth and brand authority.' },
  { num: '06', name: 'AI & Automation', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=75&auto=format&fit=crop', desc: 'Intelligent automation powered by cutting-edge AI to streamline operations and unlock business potential.' },
];

const PROJECTS = [
  { tag: 'IoT Solutions', title: 'Smart Monitoring & Automation', img: 'https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1000&q=80&auto=format&fit=crop', desc: 'End-to-end IoT ecosystem connecting physical environments with intelligent digital control.', features: ['Home & Industry Automation — smart lighting, EB management, automated door systems', 'Smart Monitoring System — real-time energy tracking with secure biometric access control', 'GPS Tracking — location-based automation and live monitoring for enhanced operational control'], reverse: false },
  { tag: 'Corporate Suite', title: 'Business Automation Platform', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80&auto=format&fit=crop', desc: 'Unified enterprise platform streamlining HR, finance, and operations in one intelligent ecosystem.', features: ['HR functions — employee onboarding, attendance, leave management and performance tracking', 'Project management — real-time collaboration, deadline monitoring and workflow automation', 'Financial suite — budgeting, invoicing, expense tracking and integrated order management'], reverse: true },
  { tag: 'Web Applications', title: 'Capture360, Libro360AI & Property360', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop', desc: 'Purpose-built web platforms delivering AI-driven insights across industries.', features: ['Capture360 — real-time construction site monitoring, resource tracking, AI-driven analytics', 'Libro360AI — adaptive learning management with intelligent recruitment and talent analytics', 'Property360 — automated real estate platform for listings, client engagement and sales ops'], reverse: false },
  { tag: 'Mobile Applications', title: 'Ecom360, Telematics & Kovais', img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1000&q=80&auto=format&fit=crop', desc: 'High-performance mobile solutions engineered for logistics, fleet management, and commerce.', features: ['Ecom360 — real-time order tracking, delivery route optimization and fulfillment automation', 'STG Telematics — fleet management with GPS, fuel efficiency analytics and alerts', 'Kovais — automating customer management, order tracking and service coordination at scale'], reverse: true },
];

const STATS = [
  { to: 50, suffix: '+', label: 'Projects Completed' },
  { to: 3, suffix: '', label: 'Technology Partners' },
  { to: 30, suffix: '+', label: 'Team Members' },
  { to: 3, suffix: '+', label: 'Years Experience' },
];

// ─── CODING BACKGROUND ───────────────────────────────────────────────────────

function CodingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let grid = [];
    const charSize = 12;

    let maskData = null;
    const maskCanvas = document.createElement('canvas');
    const mctx = maskCanvas.getContext('2d');

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const cols = Math.ceil(width / charSize);
      const rows = Math.ceil(height / charSize);
      grid = [];
      for (let i = 0; i < cols * rows; i++) {
        grid.push({
          char: Math.random() > 0.5 ? '1' : '0',
          opacity: Math.random(),
          speed: 0.01 + Math.random() * 0.03
        });
      }

      // Create mask for "STG"
      maskCanvas.width = width;
      maskCanvas.height = height;
      const isMobile = width < 768;
      const fontSize = isMobile ? Math.min(width / 2.4, 220) : Math.min(width / 2.8, 380);
      mctx.font = `800 ${fontSize}px Orbitron, sans-serif`;
      mctx.textAlign = 'center';
      mctx.textBaseline = 'middle';
      mctx.fillStyle = 'white';
      if (mctx.letterSpacing !== undefined) {
        mctx.letterSpacing = isMobile ? '2px' : '20px';
      }

      // Center it slightly higher on mobile to account for navbar/scrolling
      const centerY = isMobile ? height / 2.2 : height / 2;
      mctx.fillText('STG', width / 2, centerY);
      maskData = mctx.getImageData(0, 0, width, height).data;
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${charSize}px "Inter"`;

      const cols = Math.ceil(width / charSize);
      const rows = Math.ceil(height / charSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charSize;
          const y = r * charSize;
          const idx = r * cols + c;
          const cell = grid[idx];

          if (!cell) continue;

          // Update character and opacity for flicker
          if (Math.random() > 0.99) cell.char = Math.random() > 0.5 ? '1' : '0';
          cell.opacity += cell.speed;
          if (cell.opacity > 1 || cell.opacity < 0.2) cell.speed *= -1;

          const pixelIndex = (y * width + x) * 4;
          const isInsideSTG = maskData && maskData[pixelIndex] > 0;

          if (isInsideSTG) {
            ctx.fillStyle = `rgba(255, 26, 26, 0.4)`;
            ctx.fillText(cell.char, x, y);
          } else {
            ctx.fillStyle = `rgba(50, 0, 0, ${cell.opacity * 0.08})`;
            ctx.fillText(cell.char, x, y);
          }
        }
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="coding-background"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 1
      }}
    />
  );
}

// ─── COUNTER ──────────────────────────────────────────────────────────────────

function Counter({ to, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0, inc = to / 60;
        const t = setInterval(() => { v += inc; if (v >= to) { setVal(to); clearInterval(t); } else setVal(Math.floor(v)); }, 24);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <div ref={ref} className="stat-value">{val}{suffix}</div>;
}

// ─── FLOATING SOCIAL BUTTONS ──────────────────────────────────────────────────



// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ scrolled }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}${isMobileMenuOpen ? ' mobile-open' : ''}`}>
      <div className="nav-inner">
        <div className="nav-logo-box" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo-horizontal">
            <div className="logo-glow-container sm">
              <img src={stgLogo} alt="STG Logo" className="nav-logo-img" />
            </div>
            <div className="nav-logo-text-group">
              <span className="nav-logo-stg">STG <span className="text-red">TECH</span></span>
            </div>
          </div>
        </div>

        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>Services</a></li>
          <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollTo('products'); }}>Projects</a></li>
          <li><a href="#contact" className="nav-cta-btn" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact Us</a></li>
        </ul>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-stg-badge-wrap">
          <div className="hero-stg-badge">STG <span className="text-red">TECH</span></div>
        </div>
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text" style={{ color: '#ffffff' }}>Global Software Powerhouse</span>
          <div className="hero-eyebrow-line" />
        </div>
        <h1 className="hero-title">
          We Build
          <span className="hero-title-bold">Digital</span>
          <span className="hero-title-accent">Experiences</span>
        </h1>
        <p className="hero-subtitle">Crafting innovative technology solutions that transform businesses and elevate user experiences — powered by intelligence, built for the future.</p>
        <div className="hero-actions">
          <button className="btn-red" onClick={() => scrollTo('services')}>Explore Our Work <span>→</span></button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>Get In Touch</button>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line" />
        <span className="hero-scroll-text">Scroll</span>
      </div>
    </section>

  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="services-header">
          <div className="stg-tag">STG · INNOVATION</div>
          <div className="section-label"><span className="section-label-line" /><span className="section-label-text">What We Do</span></div>
          <h2 className="section-heading">Our <strong>Services</strong></h2>
          <p className="section-subtext">Comprehensive technology solutions tailored to every dimension of your business — from concept to deployment and beyond.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="service-stg">STG</span>
              <img src={s.img} alt={s.name} className="service-item-img" loading="lazy" />
              <div className="service-number">{s.num}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section className="section section-alt" id="products">
      <div className="container" style={{ marginBottom: '56px' }}>
        <div className="stg-tag">STG · SOLUTIONS</div>
        <div className="section-label"><span className="section-label-line" /><span className="section-label-text">What We've Built</span></div>
        <h2 className="section-heading">Our <strong>Projects</strong></h2>
      </div>
      <div className="products-container">
        {PROJECTS.map((p, i) => (
          <div key={i} className={`product-row${p.reverse ? ' reverse' : ''}`}>
            <div className="product-image-wrap">
              <img src={p.img} alt={p.title} loading="lazy" />
              <div className="product-image-overlay" />
              <span className="product-category-badge">{p.tag}</span>
            </div>
            <div className="product-body">
              <span className="product-tag">{p.tag}</span>
              <h3 className="product-title">{p.title}</h3>
              <p className="product-desc">{p.desc}</p>
              <ul className="product-features">
                {p.features.map((f, j) => <li key={j}><span className="feature-dot" />{f}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="stg-tag">STG · EMPOWERING SUCCESS</div>
        <div className="section-label" style={{ marginBottom: '56px' }}><span className="section-label-line" /><span className="section-label-text">Who We Are</span></div>

        {/* VALUES FIRST - Vision, Mission, Innovation */}
        <div className="values-grid">
          {[
            { h: 'Vision', t: 'Like a Phoenix rising from the ashes, we embrace every challenge as an opportunity for a powerful comeback. Our vision is defined by resilience—transforming every setback into a stronger, more radiant future for our partners and industries.' },
            { h: 'Mission', t: 'Strategically unpredictable, remarkably consistent. Like the Joker\'s calculated mystery, we stay ahead of the curve while maintaining a seamless, smiling interface—delivering transformative impact exactly where it\'s least expected but most needed.' },
          ].map((v, i) => (
            <div key={i} className="value-card" style={{
              backgroundImage: v.h === 'Vision' ? `url(${phoenixImg})` : `url(${jokerImg})`,
              backgroundSize: v.h === 'Vision' ? '155%' : '140%',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: v.h === 'Vision' ? 'top center' : 'center',
              textAlign: 'left'
            }}>
              <div className="value-card-overlay"></div>
              <h3 className="value-heading" style={{ position: 'relative', zIndex: 2 }}>{v.h}</h3>
              <p className="value-text" style={{ position: 'relative', zIndex: 2 }}>{v.t}</p>
            </div>
          ))}
        </div>

        {/* STORY BEHIND STG */}
        <div style={{ marginTop: '80px' }}>
          <div className="about-grid">

            <div className="about-text">
              <h2 className="section-heading">The <strong>Story</strong> Behind<br /><strong>STG</strong></h2>
              <p className="section-subtext" style={{ marginTop: '16px' }}>Three pillars define our identity — Strategic thinking, Technological innovation, and Global ambition. This is STG.</p>
              {[
                { num: '01', h: 'Strategic Excellence', t: 'Focused on delivering high-impact solutions through precision engineering and tactical business intelligence.' },
                { num: '02', h: 'Technological Innovation', t: "Leveraging cutting-edge AI and automation to redefine industrial standards and operational efficiency." },
                { num: '03', h: 'Global Impact', t: "Driving transformative success for partners across the globe with scalable, future-ready digital ecosystems." },
              ].map((s, i) => (
                <div key={i} className="about-story-item">
                  <div className="about-story-num">{s.num}</div>
                  <h4 className="about-story-heading">{s.h}</h4>
                  <p className="about-story-text">{s.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar" style={{ marginTop: '60px' }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <Counter to={s.to} suffix={s.suffix} />
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─── PARTNERS ────────────────────────────────────────────────────────────────

function Partners() {
  return (
    <div className="partners-strip">
      <div className="container">
        <div className="partners-inner">
          <div className="partners-header">
            <span className="partners-label">Strategic Partners</span>
            <div className="partners-divider" />
          </div>
          <div className="partner-items">
            {[
              { n: 'AWS', t: 'Advanced Technology Partner' },
              { n: 'Azure', t: 'Cloud Solution Provider' },
              { n: 'Oracle', t: 'Gold Level Partner' }
            ].map((p, i) => (
              <div key={i} className="partner-item">
                <div className="partner-name">{p.n}</div>
                <div className="partner-tier">{p.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone || '',
      service: form.service || '',
      message: form.message,
    };

    try {
      console.log('Sending payload to backend:', payload);

      // Using URLSearchParams might avoid complex preflight in some cases
      const formData = new URLSearchParams();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      const res = await fetch(CONTACT_API_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', res.status);

      if (!res.ok) {
        const errText = await res.text();
        console.error('Server error response:', errText);
        try {
          const errData = JSON.parse(errText);
          throw new Error(errData?.detail || errData?.message || `Server error: ${res.status}`);
        } catch (e) {
          throw new Error(`Server returned error ${res.status}`);
        }
      }

      setSent(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error('API error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="stg-tag">STG · GLOBAL</div>
        <div className="section-label" style={{ marginBottom: '56px' }}><span className="section-label-line" /><span className="section-label-text">Get In Touch</span></div>
        <div className="contact-layout">
          {/* FORM */}
          <div className="contact-form-wrap">
            <h3 className="contact-form-title">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">First Name</label>
                  <input className="form-control" type="text" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label className="form-label">Last Name</label>
                  <input className="form-control" type="text" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <input className="form-control" type="email" name="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <input className="form-control" type="tel" name="phone" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Service of Interest</label>
                <select className="form-control" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  <option>Web Development</option>
                  <option>Mobile App Development</option>
                  <option>IoT Solutions</option>
                  <option>Backend &amp; DevOps</option>
                  <option>Digital Marketing</option>
                  <option>AI &amp; Automation</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Your Message</label>
                <textarea className="form-control" rows="5" name="message" placeholder="Tell us about your project..." value={form.message} onChange={handleChange} required />
              </div>
              {error && <p style={{ color: '#ff4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
              <button type="submit" className={`form-submit${sent ? ' sent' : ''}`} disabled={loading}>
                {loading ? 'Sending...' : sent ? '✓ Message Sent Successfully!' : 'Send Message →'}
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="contact-info-side">
            <h2 className="contact-info-heading">Let's Build<br />Something <strong>Extraordinary</strong></h2>
            <p className="contact-info-text">Have a project in mind? Our team of engineers, designers, and strategists is ready to transform your vision into a powerful digital reality.</p>
            <div className="contact-detail-list">
              <a href="https://wa.me/918056823309" target="_blank" rel="noreferrer" className="contact-detail-item">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px' }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.3 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                </div>
                <span>+91 80568 23309</span>
              </a>
              <a href="https://stg-website-rouge.vercel.app/" target="_blank" rel="noreferrer" className="contact-detail-item">
                <div className="contact-detail-icon">🌐</div>
                <span>stg-website-rouge.vercel.app</span>
              </a>
            </div>
            <div className="branches-wrap">
              <span className="branches-label">Our Offices</span>
              <div className="branches-pills">
                {['Gobichettipalayam', 'Chennai', 'Bengaluru'].map((b, i) => <span key={i} className="branch-pill">{b}</span>)}
              </div>
            </div>
            <div className="ceo-quote-box">
              <p>"At STG, our vision is to empower innovation through intelligence — creating tech that doesn't just work, but inspires."</p>
              <div className="ceo-name-sm">Sunildharshan</div>
              <div className="ceo-role-sm">CEO & Founder</div>
            </div>
          </div>
        </div>

        {/* CEO BLOCK */}
        <div className="ceo-block">
          <div>
            <p className="ceo-quote">"The name STG symbolizes strategic excellence. Every product we ship, every line of code we write, every pixel we design — it is a direct expression of the talent within our team and our relentless commitment to excellence."</p>
            <div className="ceo-name">Sunildharshan</div>
            <div className="ceo-role">Chief Executive Officer & Founder, STG</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LEGAL MODAL ─────────────────────────────────────────────────────────────

function LegalModal({ type, onClose }) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      text: [
        "At STG Tech, we prioritize the security and confidentiality of your data. This policy outlines how we handle information collected through our platforms.",
        "1. Data Collection: We only collect essential information required to provide our software services, such as contact details provided via our forms.",
        "2. Usage: Your data is used exclusively for project communication, service improvement, and technical support. We never sell your data to third parties.",
        "3. Security: We implement enterprise-grade encryption and security protocols to protect against unauthorized access or data breaches.",
        "4. Cookies: Our website uses minimal cookies to enhance performance and analyze traffic for better user experience.",
        "5. Contact: For any data-related inquiries or deletion requests, please contact us at +91 80568 23309."
      ]
    },
    terms: {
      title: "Terms of Service",
      text: [
        "By engaging with STG Tech's services, you agree to the following professional terms and conditions.",
        "1. Service Delivery: We commit to delivering high-quality software solutions as per the agreed project specifications and timelines.",
        "2. Intellectual Property: All custom code and designs developed for clients remain the property of the client upon full payment, unless otherwise specified.",
        "3. Client Responsibility: Clients are responsible for providing timely feedback and necessary assets for project progression.",
        "4. Payment Terms: Project milestones and payment schedules will be defined in individual service agreements.",
        "5. Liability: STG Tech is not liable for indirect or consequential losses arising from the use of our software after final delivery and acceptance."
      ]
    }
  };

  const active = content[type];
  if (!active) return null;

  return (
    <div className="legal-modal-overlay" onClick={onClose}>
      <div className="legal-modal-content" onClick={e => e.stopPropagation()}>
        <button className="legal-modal-close" onClick={onClose}>&times;</button>
        <h3 className="legal-modal-title">{active.title}</h3>
        <div className="legal-modal-body">
          {active.text.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ onLegalClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo-box">
              <div className="logo-glow-container sm">
                <img src={stgLogo} alt="STG Logo" className="nav-logo-img" />
              </div>
              <div className="footer-logo-text-group">
                <div className="footer-logo-text">STG <span className="text-red">TECH</span></div>
                <div className="footer-arena-text">Global Software Powerhouse</div>
              </div>
            </div>
            <p className="footer-about-text">
              Driving digital transformation through strategic innovation and intelligent software solutions. We build the infrastructure for the next generation of business.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-col">
              <h4 className="footer-col-title">PLATFORM</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#products">Projects</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">SUPPORT</h4>
              <ul className="footer-links">
                <li><a href="#contact">Help Center</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onLegalClick('terms'); }}>Terms & Service</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); onLegalClick('privacy'); }}>Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">CONTACT</h4>
              <div className="footer-social-links">
                <a href="https://www.instagram.com/stg_esports___?igsh=MWJnczMzd3VneGM3cA==" target="_blank" rel="noreferrer" className="footer-social-item">
                  <div className="social-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <span>Instagram</span>
                </a>
                <a href="https://wa.me/918056823309" target="_blank" rel="noreferrer" className="footer-social-item">
                  <div className="social-icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.3 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
                  </div>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 STG Tech. All rights reserved.</div>
          <div className="footer-status">
            <span className="status-dot"></span>
            STG TECH OPERATIONAL
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [legalType, setLegalType] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="app-container">
      <CodingBackground />
      <div className="bg-overlay" />
      <Navbar scrolled={scrolled} />

      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Partners />
        <Contact />
      </main>
      <Footer onLegalClick={setLegalType} />
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
      {showTop && (
        <button className="scroll-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
      )}
    </div>
  );
}
