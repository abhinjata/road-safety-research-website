import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 'license-levels',
    icon: '🪪',
    title: 'Tiered License System',
    shortDesc: 'Leveled exams linked to real-world benefits',
    color: '#e8c547',
    detail: {
      problem: 'The current driving license test is a one-time formality — most students get licensed and never revisit their skills. Renewals are paperwork, not evaluations. The psychologist confirmed: no feedback loop means overconfidence grows unchecked.',
      solution: 'A 5-level progressive license system integrated into the app. Each level requires a more rigorous theoretical + hazard perception exam. Higher levels unlock better insurance rates, car maintenance schemes, and driving privileges. Renewal requires re-testing, not just form submission.',
      tech: ['In-app exam engine', 'Hazard perception video tests', 'Insurance API integration', 'Level badge & profile system'],
      impact: 'Turns the license from a one-time gate into an ongoing incentive. Safer drivers are visibly rewarded — making skill development aspirational, not compulsory.',
    },
  },
  {
    id: 'blind-spot',
    icon: '👁️',
    title: 'Blind Spot Alert',
    shortDesc: 'Real-time vehicle approach detection',
    color: '#e8c547',
    detail: {
      problem: 'Meet\'s accident happened at a T-junction surrounded by walls — no way to see incoming vehicles until it was too late.',
      solution: 'IoT sensors at dangerous intersections detect approaching vehicles and broadcast alerts to nearby devices via GPS. Phones vibrate and display directional warnings.',
      tech: ['GPS geofencing', 'IoT proximity sensors', 'Push notifications', 'Vibration alerts'],
      impact: 'Warnings arrive 5–10 seconds before the vehicle reaches the turn — enough time to brake or stop.',
    },
  },
  {
    id: 'speed-monitor',
    icon: '⚡',
    title: 'Speed Intelligence',
    shortDesc: 'Context-aware speed nudges',
    color: '#7eb8d4',
    detail: {
      problem: '41.6% of students speed "for fun." Overspeeding is the #1 cause in all three student interviews — but blunt warnings don\'t change behavior.',
      solution: 'The app monitors speed and cross-references it with road type, time of day, and weather. When speed exceeds context-appropriate thresholds, personalized nudges appear — not generic warnings.',
      tech: ['Accelerometer data', 'Weather API', 'Road type database', 'Behavioral nudge engine'],
      impact: 'Personalized context overcomes optimism bias — "this is a risky moment for YOU, right now."',
    },
  },
  {
    id: 'zone-alerts',
    icon: '📍',
    title: 'Hazard Zone Awareness',
    shortDesc: 'Google Maps integration for dangerous turns',
    color: '#f0855a',
    detail: {
      problem: 'All three interviewees had accidents on familiar, daily-use routes — overconfidence from familiarity is the hidden killer.',
      solution: 'Crowdsourced and data-driven hazard zone tagging integrated directly into navigation. As you approach a flagged zone, the app interrupts with a contextual alert.',
      tech: ['Google Maps SDK', 'Community reporting', 'GIS accident data', 'Route hazard overlays'],
      impact: 'Breaks the "I know this road" complacency loop by making the danger visible again, every time.',
    },
  },
  {
    id: 'emergency',
    icon: '🆘',
    title: 'Crash Detection & SOS',
    shortDesc: 'Automatic impact detection + emergency alerts',
    color: '#c47eb5',
    detail: {
      problem: 'Meet suffered a concussion and remembered nothing. His uncle arrived 5–6 minutes later — but what if no one had been reachable?',
      solution: 'Sudden deceleration triggers a 30-second countdown. If not cancelled, SOS is sent to pre-set contacts with GPS location. Connects directly to emergency services if unacknowledged.',
      tech: ['Gyroscope & accelerometer', 'Background process', 'SMS & call API', 'Location sharing'],
      impact: 'Golden hour compliance — emergency response within the critical first minutes after an accident.',
    },
  },
  {
    id: 'gamification',
    icon: '🏆',
    title: 'Safe Drive Rewards',
    shortDesc: 'Gamified incentives for safe behavior',
    color: '#6ddc8e',
    detail: {
      problem: 'The psychologist confirmed: lectures don\'t work. Students need sensation. Risk Homeostasis means they seek a target level of thrill — we must redirect it.',
      solution: 'Safe driving streaks earn points. Weekly leaderboards among college friends. Campus badges and partner discounts. The thrill is now social and quantified — through safety, not speed.',
      tech: ['Streak tracking', 'Social leaderboards', 'Partner API integrations', 'Push engagement loops'],
      impact: 'Channel sensation-seeking into safe behavior. Peer pressure becomes a safety mechanism, not a danger.',
    },
  },
];

const mockScreens = [
  {
    id: 'home',
    label: 'Dashboard',
    color: '#e8c547',
    content: (
      <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Good morning</div>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>Taha 👋</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(232,197,71,0.2)', border: '1.5px solid #e8c547', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>T</div>
        </div>

        <div style={{ background: 'rgba(232,197,71,0.1)', border: '1px solid rgba(232,197,71,0.3)', borderRadius: 10, padding: '1rem' }}>
          <div style={{ fontSize: '0.6rem', color: '#e8c547', marginBottom: 4 }}>SAFE DRIVE STREAK</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#e8c547' }}>🔥 14 days</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>Top 3% at Mahindra University</div>
        </div>

        <div style={{ background: 'rgba(240,133,90,0.1)', border: '1px solid rgba(240,133,90,0.3)', borderRadius: 10, padding: '1rem' }}>
          <div style={{ fontSize: '0.6rem', color: '#f0855a', marginBottom: 4 }}>⚠️ NEARBY HAZARD ZONE</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>T-junction • Bahadurpally Road</div>
          <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>3 accidents reported this month</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ background: 'rgba(126,184,212,0.1)', borderRadius: 8, padding: '0.75rem', border: '1px solid rgba(126,184,212,0.2)' }}>
            <div style={{ fontSize: '0.6rem', color: '#7eb8d4', marginBottom: 2 }}>AVG SPEED</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>28 km/h</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>Today</div>
          </div>
          <div style={{ background: 'rgba(109,220,142,0.1)', borderRadius: 8, padding: '0.75rem', border: '1px solid rgba(109,220,142,0.2)' }}>
            <div style={{ fontSize: '0.6rem', color: '#6ddc8e', marginBottom: 2 }}>POINTS</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>2,840</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>This week +320</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'alert',
    label: 'Live Alert',
    color: '#f0855a',
    content: (
      <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(240,133,90,0.2)', border: '2px solid #f0855a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}
        >
          ⚠️
        </motion.div>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f0855a', marginBottom: 4 }}>VEHICLE APPROACHING</div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>From your left — T-junction ahead</div>
        </div>
        <div style={{ background: 'rgba(240,133,90,0.15)', borderRadius: 8, padding: '0.75rem 1.5rem', border: '1px solid rgba(240,133,90,0.4)', fontSize: '0.7rem', color: '#f0855a' }}>
          REDUCE SPEED — STOP IF POSSIBLE
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 6, padding: '0.5rem 1rem', fontSize: '0.7rem' }}>Dismiss</div>
          <div style={{ background: '#f0855a', borderRadius: 6, padding: '0.5rem 1rem', fontSize: '0.7rem', color: '#000', fontWeight: 600 }}>Call Help</div>
        </div>
      </div>
    ),
  },
  {
    id: 'map',
    label: 'Hazard Map',
    color: '#7eb8d4',
    content: (
      <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Hazard Zones Near You</div>
        <div style={{ flex: 1, background: 'rgba(126,184,212,0.08)', borderRadius: 10, border: '1px solid rgba(126,184,212,0.2)', position: 'relative', overflow: 'hidden', minHeight: 140 }}>
          {/* Fake map grid */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(126,184,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(126,184,212,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* Hazard dots */}
          <div style={{ position: 'absolute', top: '40%', left: '35%', width: 16, height: 16, borderRadius: '50%', background: 'rgba(240,133,90,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem' }}>!</div>
          <div style={{ position: 'absolute', top: '25%', left: '60%', width: 12, height: 12, borderRadius: '50%', background: 'rgba(232,197,71,0.8)' }} />
          <div style={{ position: 'absolute', top: '65%', left: '50%', width: 14, height: 14, borderRadius: '50%', background: 'rgba(240,133,90,0.6)' }} />
          {/* You marker */}
          <div style={{ position: 'absolute', top: '50%', left: '45%', width: 10, height: 10, borderRadius: '50%', background: '#7eb8d4', boxShadow: '0 0 12px #7eb8d4' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { name: 'Bahadurpally T-junction', risk: 'High', count: 3 },
            { name: 'Kompally Main Road', risk: 'Medium', count: 1 },
          ].map((zone, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '0.6rem 0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 500 }}>{zone.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)' }}>{zone.count} accidents this month</div>
              </div>
              <div style={{ fontSize: '0.6rem', color: zone.risk === 'High' ? '#f0855a' : '#e8c547', background: zone.risk === 'High' ? 'rgba(240,133,90,0.1)' : 'rgba(232,197,71,0.1)', borderRadius: 4, padding: '0.2rem 0.5rem' }}>
                {zone.risk}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Prototype() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  const [activeScreen, setActiveScreen] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section style={{
        padding: '10rem 2rem 6rem', maxWidth: 900, margin: '0 auto',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1.5rem',
          }}>
            THE SOLUTION
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: '1.5rem',
          }}>
            SafeRoute<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>— not a warning. a system.</span>
          </h1>
          <p style={{
            fontSize: '1.05rem', color: 'var(--text-dim)',
            maxWidth: 600, lineHeight: 1.75, fontWeight: 300,
          }}>
            A mobile-first platform that intervenes in real time — at the exact location, moment, and context where accidents happen. Not lectures. Not campaigns. Action, at the right second.
          </p>
        </motion.div>
      </section>

      {/* Design principle */}
      <section style={{
        padding: '4rem 2rem', background: 'var(--surface)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Core Principle', value: 'Right place, right time', icon: '🎯' },
            { label: 'Primary User', value: 'College students, 18–25', icon: '🎓' },
            { label: 'Platform', value: 'iOS + Android', icon: '📱' },
            { label: 'Integration', value: 'Google Maps + IoT', icon: '🔗' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                {item.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature explorer */}
      <section style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            KEY FEATURES
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)' }}>
            Five interventions,<br />
            <span style={{ fontStyle: 'italic' }}>one system</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', gap: '2rem' }}>
          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {features.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => setActiveFeature(f)}
                style={{
                  background: activeFeature.id === f.id ? `${f.color}12` : 'var(--surface)',
                  border: `1px solid ${activeFeature.id === f.id ? f.color : 'var(--border)'}`,
                  borderRadius: 8, padding: '1.25rem',
                  textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: '1rem',
                }}
                whileHover={{ x: 4 }}
              >
                <span style={{ fontSize: '1.4rem' }}>{f.icon}</span>
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.9rem', color: activeFeature.id === f.id ? f.color : 'var(--text)', marginBottom: '0.2rem' }}>
                    {f.title}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.shortDesc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feature detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${activeFeature.color}30`,
                borderRadius: 12, padding: '2.5rem',
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: `${activeFeature.color}18`,
                border: `1.5px solid ${activeFeature.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', marginBottom: '1.5rem',
              }}>
                {activeFeature.icon}
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.75rem', color: activeFeature.color }}>
                {activeFeature.title}
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  THE PROBLEM
                </p>
                <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {activeFeature.detail.problem}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: activeFeature.color, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  THE SOLUTION
                </p>
                <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {activeFeature.detail.solution}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {activeFeature.detail.tech.map((t, i) => (
                  <span key={i} style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                    color: activeFeature.color, border: `1px solid ${activeFeature.color}30`,
                    borderRadius: 4, padding: '0.25rem 0.6rem', letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              <div style={{
                background: `${activeFeature.color}08`, borderRadius: 8,
                padding: '1rem 1.25rem', borderLeft: `3px solid ${activeFeature.color}`,
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: activeFeature.color, letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                  BEHAVIORAL IMPACT
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  {activeFeature.detail.impact}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* License Levels Visual */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '4rem' }}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#e8c547', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
          TIERED LICENSE SYSTEM — 5 LEVELS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
          {[
            { level: 'L1', title: 'Learner', desc: 'Basic theory & signs', benefit: 'Standard coverage', color: '#6b6878' },
            { level: 'L2', title: 'Aware', desc: 'Hazard perception test', benefit: '5% insurance discount', color: '#7eb8d4' },
            { level: 'L3', title: 'Skilled', desc: 'Road scenario simulation', benefit: '15% discount + free servicing', color: '#6ddc8e' },
            { level: 'L4', title: 'Advanced', desc: 'Night & highway driving', benefit: '25% discount + priority claims', color: '#e8c547' },
            { level: 'L5', title: 'Expert', desc: 'Full hazard + renewal test', benefit: 'Best rates + maintenance plan', color: '#f0855a' },
          ].map((lvl, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${lvl.color}40`,
                borderRadius: 10, padding: '1.25rem 1rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `${lvl.color}18`, border: `2px solid ${lvl.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 0.75rem',
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: '0.8rem', color: lvl.color,
              }}>
                {lvl.level}
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', marginBottom: '0.4rem', color: lvl.color }}>{lvl.title}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.75rem', lineHeight: 1.4 }}>{lvl.desc}</p>
              <div style={{ borderTop: `1px solid ${lvl.color}20`, paddingTop: '0.75rem' }}>
                <p style={{ fontSize: '0.68rem', color: lvl.color, fontFamily: 'var(--font-mono)', lineHeight: 1.4 }}>{lvl.benefit}</p>
              </div>
              {i < 4 && (
                <div style={{
                  position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)',
                  color: 'var(--text-muted)', fontSize: '1rem', zIndex: 1,
                }}>→</div>
              )}
            </motion.div>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '1rem', lineHeight: 1.6 }}>
          Both first-time applicants and renewal candidates must pass their level exam. Vision and hazard perception re-tested at every renewal cycle. Higher levels unlock real financial and maintenance benefits — making safer driving the economically rational choice.
        </p>
      </motion.div>
      </section>

      {/* App mockup */}
      <section style={{
        padding: '6rem 2rem',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
              UI PROTOTYPE
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)' }}>
              What it looks like
            </h2>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Screen tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '3rem' }}>
              {mockScreens.map((screen, i) => (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(i)}
                  style={{
                    background: activeScreen === i ? `${screen.color}15` : 'none',
                    border: `1px solid ${activeScreen === i ? screen.color : 'var(--border)'}`,
                    borderRadius: 6, padding: '0.5rem 1rem',
                    color: activeScreen === i ? screen.color : 'var(--text-dim)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    cursor: 'pointer', letterSpacing: '0.06em',
                    transition: 'all 0.2s ease',
                    textAlign: 'left', whiteSpace: 'nowrap',
                  }}
                >
                  {screen.label}
                </button>
              ))}
            </div>

            {/* Phone mockup */}
            <motion.div
              style={{
                width: 260, flexShrink: 0,
                background: '#0a0a12',
                border: '2px solid rgba(255,255,255,0.1)',
                borderRadius: 36, padding: '12px',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
                position: 'relative',
              }}
            >
              {/* Notch */}
              <div style={{
                width: 80, height: 22, background: '#0a0a12',
                borderRadius: '0 0 14px 14px', margin: '0 auto 8px',
                border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none',
              }} />

              {/* Screen content */}
              <div style={{
                background: '#12121e', borderRadius: 24,
                height: 460, overflow: 'hidden', position: 'relative',
                color: 'white',
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScreen}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    style={{ height: '100%' }}
                  >
                    {mockScreens[activeScreen].content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home bar */}
              <div style={{ width: 80, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2, margin: '10px auto 0' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* HMW statement */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(232,197,71,0.05) 0%, transparent 65%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '2rem' }}>
            HOW MIGHT WE...
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            lineHeight: 1.2, marginBottom: '2rem',
          }}>
            "How might we help university students <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>make safer decisions</span> in the exact moment they face road danger?"
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {['Research-backed', 'Behaviorally designed', 'Real-time', 'Student-first'].map((tag, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'var(--accent)', border: '1px solid var(--border)',
                borderRadius: 20, padding: '0.4rem 1rem', letterSpacing: '0.08em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
