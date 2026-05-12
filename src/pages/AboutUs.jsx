import { motion } from 'framer-motion';

const members = [
  {
    id: 'SE24UECM023',
    name: 'V. Hema Sahasra',
    role: 'Research Lead',
    focus: 'Road safety behavior & injury patterns, Bengaluru study analysis',
    color: '#e8c547',
  },
  {
    id: 'SE24UECM030',
    name: 'Sanjana Sathiraju',
    role: 'Data & Policy Research',
    focus: 'India & Nepal road accident analysis, policy gap identification',
    color: '#7eb8d4',
  },
  {
    id: 'SE24UCAB013',
    name: 'N. Rakshana',
    role: 'Child Safety Specialist',
    focus: 'School commute injuries in Hyderabad, commuter vulnerability mapping',
    color: '#f0855a',
  },
  {
    id: 'SE24UCSE072',
    name: 'Anmol Upadhyay',
    role: 'Behavioral Analyst',
    focus: 'Knowledge-attitude-practice gap in Telangana, student behavior patterns',
    color: '#c47eb5',
  },
  {
    id: 'SE24UECM012',
    name: 'Prachi Dubey',
    role: 'Awareness Researcher',
    focus: 'RTA awareness levels, Chennai college survey, WHO data interpretation',
    color: '#6ddc8e',
  },
  {
    id: 'SE24UARI017',
    name: 'Abhinav Jata',
    role: 'Psychology Researcher & WebDev Lead',
    focus: 'Behavioral psychology frameworks, sensation-seeking analysis, developer of the website',
    color: '#e88c8c',
  },
  {
    id: 'SE24UARI031',
    name: 'Karri Sathya Naga Venkat Reddy',
    role: 'Traffic Psychology Analyst',
    focus: 'Emotional motivations behind risky driving, traffic policies analysis in Hyderabad',
    color: '#ffc07a',
  },
  {
    id: 'SE24UCAB020',
    name: 'Anmol Bharti',
    role: 'Field Research',
    focus: 'Medical student RTA study, Puducherry cross-sectional analysis',
    color: '#82c9c0',
  },
];

const methodology = [
  {
    step: '01',
    title: 'Literature Review',
    desc: '8 members each studied 2 academic papers and 2 real-world news incidents to build a comprehensive evidence base.',
    color: '#e8c547',
  },
  {
    step: '02',
    title: 'Student Survey',
    desc: 'Distributed a structured questionnaire to university students to quantify behaviors, attitudes, and experiences.',
    color: '#7eb8d4',
  },
  {
    step: '03',
    title: 'Qualitative Interviews',
    desc: 'Conducted in-depth interviews with students who had direct accident experience — Meet, Maitreya, and Taha.',
    color: '#c47eb5',
  },
  {
    step: '04',
    title: 'Psychologist Consultation',
    desc: 'A behavioral psychology expert analyzed our findings and applied theoretical frameworks to explain the behavior-knowledge gap.',
    color: '#f0855a',
  },
  {
    step: '05',
    title: 'Synthesis & Prototype',
    desc: 'All insights converged into a single design principle: real-time, location-based intervention at the moment of danger.',
    color: '#6ddc8e',
  },
];

export default function AboutUs() {
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
            TEAM CANVASCREW — MAHINDRA UNIVERSITY
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: '1.5rem',
          }}>
            The people<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>behind the work</span>
          </h1>
          <p style={{
            fontSize: '1.05rem', color: 'var(--text-dim)',
            maxWidth: 560, lineHeight: 1.75, fontWeight: 300,
          }}>
            Eight students. Eight research threads. One shared mission: understand why students keep dying on roads — and design a way to change that.
          </p>
        </motion.div>
      </section>

      {/* Team Grid */}
      <section style={{ padding: '2rem 2rem 6rem', maxWidth: 1100, margin: '0 auto' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '3rem',
          }}
        >
          THE TEAM
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 8, padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
              }}
              whileHover={{
                borderColor: member.color,
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              {/* Avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `${member.color}18`,
                border: `1.5px solid ${member.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.1rem', color: member.color,
                marginBottom: '1.25rem',
              }}>
                {member.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                marginBottom: '0.3rem', lineHeight: 1.2,
              }}>
                {member.name}
              </h3>

              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                color: member.color, letterSpacing: '0.08em',
                marginBottom: '1rem',
              }}>
                {member.role}
              </p>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                {member.focus}
              </p>

              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--text-muted)', marginTop: '1.25rem',
                letterSpacing: '0.05em',
              }}>
                {member.id}
              </p>

              {/* Decorative line */}
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                  background: member.color, scaleX: 0, originX: 0,
                }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section style={{
        padding: '6rem 2rem', background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '4rem' }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1rem',
            }}>
              OUR METHODOLOGY
            </p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-display)' }}>
              How we approached<br />
              <span style={{ fontStyle: 'italic' }}>the problem</span>
            </h2>
          </motion.div>

          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 22, top: 0, bottom: 0,
              width: 1, background: 'var(--border)',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {methodology.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `${step.color}15`,
                    border: `1.5px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                    color: step.color, flexShrink: 0, zIndex: 1,
                  }}>
                    {step.step}
                  </div>
                  <div style={{ paddingTop: '0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.65 }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(232,197,71,0.04) 0%, transparent 70%)`,
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}
        >
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '5rem',
            color: 'var(--accent)', opacity: 0.15, marginBottom: '-2rem',
            lineHeight: 1,
          }}>
            "
          </div>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
            lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text)',
            marginBottom: '2rem',
          }}>
            We are not building an app. We are designing a behavior — making safe driving the natural, rewarding, and socially expected choice for every student on every road.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em' }}>
            — TEAM CANVASCREW
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
