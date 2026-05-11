import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GridDistortion from '../components/reactbits/GridDistortion';

const stats = [
  { value: '1.19M', label: 'Deaths annually from road accidents globally', source: 'WHO' },
  { value: '55.5%', label: 'of student injuries caused by road accidents', source: 'Bengaluru Study' },
  { value: '36.8%', label: 'of medical students had experienced an RTA', source: 'Puducherry Study' },
  { value: '34%', label: 'students drive without a valid license', source: 'Saveetha Survey' },
];

const problems = [
  {
    num: '01',
    title: 'Knowledge ≠ Behavior',
    body: 'Students know traffic rules but consistently break them. 94.7% say helmets are necessary — only 76% wear one.',
    color: '#e8c547',
  },
  {
    num: '02',
    title: 'Blind Spot Infrastructure',
    body: 'Dangerous intersections with no visibility aids, poor lighting, and absent traffic signals compound human error.',
    color: '#f0855a',
  },
  {
    num: '03',
    title: 'The Psychology of Rush',
    body: 'Time pressure, overconfidence on familiar routes, and thrill-seeking lead to fatal split-second decisions.',
    color: '#7eb8d4',
  },
  {
    num: '04',
    title: 'No Real-Time Intervention',
    body: 'There is no system that warns students in the moment — before the accident, not after it.',
    color: '#c47eb5',
  },
];

function FloatingOrb({ style }) {
  return (
    <div style={{
      position: 'absolute', borderRadius: '50%',
      filter: 'blur(80px)', opacity: 0.12, pointerEvents: 'none',
      ...style,
    }} />
  );
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    let start = null;
    const target = 1190000;
    const duration = 2500;
    function tick(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    const timer = setTimeout(() => { frame = requestAnimationFrame(tick); }, 800);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '100vh' }}
    >
      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
        padding: '8rem 2rem 4rem',
      }}>
        <FloatingOrb style={{ width: 600, height: 600, background: '#e8c547', top: '-10%', right: '-15%' }} />
        <FloatingOrb style={{ width: 400, height: 400, background: '#f0855a', bottom: '10%', left: '-10%' }} />

        {/* Interactive grid distortion background */}
        <GridDistortion />

        <motion.div style={{ y: y1, opacity: opacity1, position: 'relative', textAlign: 'center', maxWidth: 900 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase',
              border: '1px solid var(--border)', borderRadius: 20,
              padding: '0.4rem 1rem', marginBottom: '2.5rem',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Design Thinking Research — Mahindra University
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 900, lineHeight: 1.0,
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ display: 'block' }}>Roads are</span>
            <span style={{
              display: 'block', fontStyle: 'italic',
              WebkitTextStroke: '1px var(--accent)',
              color: 'transparent',
            }}>Killing</span>
            <span style={{ display: 'block' }}>Students.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: '1.1rem', color: 'var(--text-dim)', maxWidth: 600,
              margin: '0 auto 3rem', lineHeight: 1.7, fontWeight: 300,
            }}
          >
            Every day, young people in India navigate roads that are structurally dangerous and psychologically underestimated. We set out to understand why — and design a way out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => navigate('/journey')}
              style={{
                background: 'var(--accent)', color: '#08080f',
                border: 'none', padding: '0.85rem 2rem',
                fontFamily: 'var(--font-body)', fontWeight: 500,
                fontSize: '0.9rem', letterSpacing: '0.04em',
                borderRadius: 4, cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 30px rgba(232,197,71,0.3)'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
            >
              See Our Journey →
            </button>
            <button
              onClick={() => navigate('/prototype')}
              style={{
                background: 'none', color: 'var(--text)',
                border: '1px solid var(--border)', padding: '0.85rem 2rem',
                fontFamily: 'var(--font-body)', fontWeight: 400,
                fontSize: '0.9rem', letterSpacing: '0.04em',
                borderRadius: 4, cursor: 'pointer',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; }}
            >
              View Prototype
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 1, height: 40, background: 'linear-gradient(var(--accent), transparent)' }}
          />
        </motion.div>
      </section>

      {/* Live counter */}
      <section style={{
        padding: '5rem 2rem', textAlign: 'center',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '1rem' }}>
            DEATHS FROM ROAD ACCIDENTS — ANNUALLY
          </p>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 12vw, 9rem)',
            fontWeight: 900, color: 'var(--accent2)',
            letterSpacing: '-0.02em', lineHeight: 1,
          }}>
            {count.toLocaleString()}
          </div>
          <p style={{ color: 'var(--text-dim)', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 300 }}>
            India contributes to 11% of global road accident deaths — with young adults disproportionately affected.
          </p>
        </motion.div>
      </section>

      {/* Stats grid */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            THE NUMBERS
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            What the data<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>actually</span> tells us
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8, padding: '2rem',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{ borderColor: 'var(--accent)', y: -4, transition: { duration: 0.2 } }}
            >
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '3.5rem',
                fontWeight: 900, color: 'var(--accent)',
                lineHeight: 1, marginBottom: '0.75rem',
              }}>
                {stat.value}
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {stat.label}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: 'var(--text-muted)', letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                Source: {stat.source}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problem breakdown */}
      <section style={{
        padding: '6rem 2rem', background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              PROBLEM STATEMENT
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
              Four compounding<br />
              <span style={{ fontStyle: 'italic' }}>failure points</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: 'var(--surface)', padding: '2.5rem',
                  position: 'relative', overflow: 'hidden',
                }}
                whileHover={{ background: 'var(--bg)', transition: { duration: 0.2 } }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  color: p.color, marginBottom: '1.5rem', letterSpacing: '0.1em',
                }}>
                  {p.num}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                  marginBottom: '1rem', lineHeight: 1.2,
                }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.65 }}>
                  {p.body}
                </p>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2, background: p.color, transform: 'scaleX(0)',
                  transformOrigin: 'left', transition: 'transform 0.3s ease',
                }} className="problem-line" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '8rem 2rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <FloatingOrb style={{ width: 500, height: 500, background: '#7eb8d4', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontFamily: 'var(--font-display)', marginBottom: '1.5rem',
          }}>
            We went looking for answers.
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Research papers, expert interviews, field surveys, and a psychologist's lens. Follow the journey that led to our prototype.
          </p>
          <button
            onClick={() => navigate('/journey')}
            style={{
              background: 'none', color: 'var(--accent)',
              border: '1px solid var(--accent)', padding: '1rem 2.5rem',
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              letterSpacing: '0.06em', borderRadius: 4, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#08080f'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--accent)'; }}
          >
            Explore the Journey →
          </button>
        </motion.div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .problem-card:hover .problem-line { transform: scaleX(1) !important; }
      `}</style>
    </motion.div>
  );
}
