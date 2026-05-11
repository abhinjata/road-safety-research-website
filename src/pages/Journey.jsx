import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const surveyCharts = [
  { file: '/survey/01_gender.png', title: 'Gender Distribution', caption: '44 respondents surveyed' },
  { file: '/survey/02_age.png', title: 'Age Distribution', caption: 'Majority aged 18–22' },
  { file: '/survey/03_accident_yn.png', title: 'Accident Involvement', caption: 'Direct accident experience' },
  { file: '/survey/04_traffic_rules.png', title: 'Rule Compliance', caption: 'How often rules are followed' },
  { file: '/survey/05_transport.png', title: 'Mode of Transport', caption: 'Daily commute vehicles' },
  { file: '/survey/06_accident_location.png', title: 'Accident Locations', caption: 'Where accidents occurred' },
  { file: '/survey/07_speed_comfort.png', title: 'Speed Limit Views', caption: 'Comfort with current limits' },
  { file: '/survey/08_awareness_week.png', title: 'Safety Awareness', caption: 'Awareness of safety campaigns' },
];

function SurveyGallery({ color }) {
  const [lightbox, setLightbox] = useState(null);
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color, letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
          SURVEY DATA VISUALIZATIONS — 44 RESPONDENTS
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {surveyCharts.map((chart, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setLightbox(chart)}
              style={{
                background: 'var(--bg)',
                border: `1px solid ${color}25`,
                borderRadius: 8, overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
              }}
              whileHover={{ borderColor: color, y: -3 }}
            >
              <div style={{ background: '#08080f', padding: '0.5rem' }}>
                <img
                  src={chart.file}
                  alt={chart.title}
                  style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 4, display: 'block' }}
                />
              </div>
              <div style={{ padding: '0.75rem 1rem' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.2rem' }}>{chart.title}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{chart.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 900,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${color}40`,
                borderRadius: 12, overflow: 'hidden',
                maxWidth: 800, width: '100%',
              }}
            >
              <img src={lightbox.file} alt={lightbox.title} style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontWeight: 500 }}>{lightbox.title}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lightbox.caption}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text-dim)', padding: '0.4rem 0.9rem', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
                >
                  close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const phases = [
  {
    phase: 'Phase 01',
    title: 'Secondary Research',
    subtitle: 'Grounding in Evidence',
    color: '#e8c547',
    icon: '📄',
    content: [
      {
        type: 'paper',
        title: 'Road Safety Behavior & Injuries Among College Students — Bengaluru',
        authors: 'Rana Sarvar, P. K. Sreenath Menon, M. D. Sangeetha',
        insight: '27.5% of students experienced injuries in the past 30 days. Road accidents accounted for 55.5% of these. Unsafe practices like no helmets, mobile phone use, and overspeeding were the major culprits.',
        tag: 'Research Paper',
      },
      {
        type: 'paper',
        title: 'Knowledge, Attitude & Practice Toward Road Safety — Telangana',
        authors: 'Jothula, Kishore Yadav; Sreeharshika, D.',
        insight: 'The gap between attitude and practice was startling: 94.7% agreed helmets are necessary, but only 76% wore them. 80.3% believed in following road signs — only 16% consistently did. Zero pillion riders wore helmets despite 53.8% agreeing they should.',
        tag: 'Research Paper',
      },
      {
        type: 'paper',
        title: 'Road Traffic Injuries to Children During School Commute — Hyderabad',
        authors: 'Tetali, Edwards, Murthy, Roberts',
        insight: 'Cycling had a 33% injury rate — the highest by mode. School buses had just 8%. Boys were injured at 25% vs 11% for girls. Urban infrastructure fails to protect its most vulnerable commuters.',
        tag: 'Research Paper',
      },
      {
        type: 'paper',
        title: 'Traffic Analysis & Road Accidents — GIS Study of Hyderabad',
        authors: 'Abhinav Jata (Team)',
        insight: 'Rapid urbanization increased vehicle numbers while roads stayed static. Certain intersections consistently produced accidents. But behavioral reasons behind violations remained deeply underexplored — pointing us toward psychology.',
        tag: 'GIS Analysis',
      },
      {
        type: 'news',
        title: 'Hoskote: How a Joyride at Dawn Turned Deadly',
        source: 'The Federal, Feb 2026',
        insight: 'A group of students drove at high speed at 3 AM "in excitement" toward Nandi Hills. They lost control. Six students died. The "joyride effect" — where driving becomes entertainment — reduces risk perception in groups.',
        tag: 'News Article',
        color: '#f0855a',
      },
      {
        type: 'news',
        title: 'MBBS Student Killed as Speeding Fortuner Rams Bikers — Gorakhpur',
        source: 'Times of India',
        insight: 'A 22-year-old student killed on a night overbridge. The SUV was on the wrong side, traveling at high speed. Speed + darkness + wrong-side driving — a fatal combination.',
        tag: 'News Article',
        color: '#f0855a',
      },
    ],
    summary: 'Secondary research revealed a persistent gap between knowing and doing, and pointed us toward psychological factors as the missing piece.',
  },
  {
    phase: 'Phase 02',
    title: 'Student Survey',
    subtitle: 'Quantitative Insights',
    color: '#7eb8d4',
    icon: '📊',
    content: [
      {
        type: 'insight',
        title: 'Helmet Usage',
        stat: '79%',
        detail: 'wore helmets — meaning 1 in 5 students didn\'t, even with awareness of the rule',
        tag: 'Safety Gear',
      },
      {
        type: 'insight',
        title: 'Why Students Speed',
        stat: '41.6%',
        detail: 'said "for fun" — thrill-seeking overrides safety knowledge',
        tag: 'Psychology',
      },
      {
        type: 'insight',
        title: 'No Valid License',
        stat: '34%',
        detail: 'of students drove vehicles without a valid license',
        tag: 'Compliance',
      },
      {
        type: 'insight',
        title: 'Familiar Route Overconfidence',
        stat: '3/3',
        detail: 'interview subjects described accidents on familiar, daily-use routes — familiarity breeds complacency',
        tag: 'Behavior',
      },
      {
        type: 'insight',
        title: 'Drunk Driving Admission',
        stat: '24.6%',
        detail: 'admitted to driving under the influence despite 55.3% acknowledging its danger',
        tag: 'Attitude vs. Practice',
      },
      {
        type: 'insight',
        title: 'Peak Accident Time',
        stat: '8–9 AM',
        detail: 'College rush hours dominate — students trade safety for punctuality',
        tag: 'Timing',
      },
    ],
    summary: 'Survey data confirmed the behavior-knowledge gap is not a knowledge problem. It\'s an emotional and contextual one.',
  },
  {
    phase: 'Phase 03',
    title: 'Student Interviews',
    subtitle: 'Lived Experiences',
    color: '#c47eb5',
    icon: '🎙️',
    content: [
      {
        type: 'quote',
        name: 'Meet Sanghani',
        role: 'AI2, Mahindra University',
        text: 'I was at 20 km/h on a T-cross I\'ve used every day for four months. The truck came from behind a wall — no honk, no warning. The road was wet. I suffered a concussion and remember nothing after.',
        insight: 'Key issue: blind-spot intersections with no visual or audio warnings. Familiar routes cause complacency.',
        solutions: ['Convex mirrors at dangerous intersections', 'Maps integration flagging accident-prone turns', 'Vehicle-approach indicator lights'],
      },
      {
        type: 'quote',
        name: 'Maitreya',
        role: 'Student Witness',
        text: 'The biker was rushing, maybe trying to beat the signal. It was 6:30 PM, and he wasn\'t focused. The familiar route made him overconfident. Help arrived in 10–15 minutes.',
        insight: 'Key issue: time pressure and overconfidence. Urgency and impatience override traffic rules.',
        solutions: ['Real-time speed monitoring app', 'Reward-based safe driving gamification', 'Emergency alert to contacts'],
      },
      {
        type: 'quote',
        name: 'Taha',
        role: 'Student — Self-involved',
        text: 'I was at 30–35 km/h, on my daily route to college at 8:15 AM. Another bike came from a side street without slowing. I didn\'t expect it. Potholes, peak hour, both of us rushing.',
        insight: 'Key issue: no side-road hazard warning. Rush hour + poor road conditions + unexpected entry = collision.',
        solutions: ['Intersection sensors for blind-spot alerts', 'GPS-based hazard zone reminders', 'Sudden impact detection + emergency contact notification'],
      },
    ],
    summary: 'Every interviewee independently pointed to the same core need: real-time, in-the-moment warnings at dangerous points — not awareness campaigns after the fact.',
  },
  {
    phase: 'Phase 04',
    title: 'Psychologist Interview',
    subtitle: 'Expert Behavioral Analysis',
    color: '#f0855a',
    icon: '🧠',
    content: [
      {
        type: 'theory',
        title: 'Indian Road Culture & Rule Bending',
        author: 'Traffic Psychologist Interview',
        text: 'Informal driving norms are deeply embedded in Indian road culture — rule bending is normalized and even socially expected. Students absorb these norms before they ever get behind the wheel, making compliance feel unnatural.',
        implication: 'Interventions must address the social norm, not just the individual — peer-visible safe behavior is more powerful than private warnings.',
      },
      {
        type: 'theory',
        title: 'Overconfidence in Young Drivers',
        author: 'Traffic Psychologist Interview',
        text: 'Overconfidence develops through a lack of real-world feedback — young drivers make risky decisions that don\'t immediately result in accidents, reinforcing the belief that they are skilled enough to handle danger. Experience without consequence breeds false confidence.',
        implication: 'License tests must include real-world hazard scenarios, not just theoretical knowledge — simulated danger closes the feedback loop.',
      },
      {
        type: 'theory',
        title: 'Bikers, Status & the KTM Effect',
        author: 'Traffic Psychologist Interview',
        text: 'High-performance bikes like the KTM Duke 200 are status symbols among students. The risk is not just vehicle capability — it\'s the social identity attached to riding aggressively. The bike becomes a stage for displaying confidence, speed, and fearlessness to peers.',
        implication: 'The behavior is social performance. Solutions must make safe riding equally aspirational — reframe safety as skill, not weakness.',
      },
      {
        type: 'theory',
        title: 'Distraction: Headsets & Mobile Use',
        author: 'Traffic Psychologist Interview',
        text: 'Students know earphones while driving are unsafe — yet they do it anyway. The psychologist identified this as a classic attitude-behavior gap driven by habituation and perceived low risk. The behavior is automatic and socially invisible, making it easy to rationalize.',
        implication: 'App-based distraction detection (earphone use, screen activity) with gentle, non-intrusive nudges can interrupt the habit loop without triggering defensiveness.',
      },
      {
        type: 'theory',
        title: 'Rash Driving: Ego, Thrill & Time Pressure',
        author: 'Traffic Psychologist Interview',
        text: 'Three psychological triggers dominate rash driving: ego (the need to assert dominance on the road), thrill-seeking (the dopamine of speed), and time pressure (college timing creating a false sense of urgency). Stress and anger act as amplifiers — negative emotions are literally "driven out" on the road.',
        implication: 'Real-time emotional state detection — combined with hazard zone alerts — could intervene precisely when students are most vulnerable to rash decisions.',
      },
      {
        type: 'synthesis',
        title: 'The Psychologist\'s Core Recommendation',
        text: 'Lasting behavior change requires structural redesign, not awareness campaigns. Driving license tests should be more rigorous, frequent, and tiered — testing real hazard perception, not just rules. Renewal should involve re-evaluation of skills, vision, and judgment. The expert strongly endorsed our license leveling concept as a meaningful systemic intervention.',
      },
    ],
    summary: 'The psychologist confirmed: the problem is behavioral and systemic. Students need harder tests, contextual real-time nudges, and social environments where safe driving is the aspirational norm.',
  },
];

function MindMap({ color }) {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    {
      id: 'intro', label: 'Interview Introduction',
      children: ['Interviewer Introduction', 'Purpose of Interview'],
    },
    {
      id: 'culture', label: 'Indian Road Culture & Behavior',
      children: ['Rule Bending and Informal Norms', 'Influence on Student Risk'],
    },
    {
      id: 'overconf', label: 'Overconfidence in Young Drivers',
      children: ['Causes and Origins'],
    },
    {
      id: 'bikers', label: 'Bikers and Status Influence',
      children: ['KTM Duke 200 & Accident Involvement', 'Vehicle Capability vs Social Image'],
    },
    {
      id: 'distract', label: 'Distraction & Headset Driving',
      children: ['Headset/Earphone Use While Driving', 'Mobile Usage Among Students'],
    },
    {
      id: 'rash', label: 'Rash Driving & Decision Making',
      children: ['Ego, Thrill Seeking, Time Pressure', 'Stress & Anger as Outlets'],
    },
    {
      id: 'interventions', label: 'Realistic Interventions',
      children: ['Education and Design Changes', 'License Test Frequency & Strictness'],
    },
    {
      id: 'conclusion', label: 'Conclusion',
      children: ['Summary of Insights', 'Future Collaboration on Prototype', 'Anticipation of Shared Article'],
    },
  ];

  const ROW_H = 72;
  const TOTAL_H = nodes.length * ROW_H;
  const CENTER_Y = TOTAL_H / 2;
  const ROOT_X = 60;
  const MID_X = 260;
  const LEAF_X = 480;
  const SVG_W = 780;

  // compute y positions
  const nodeYs = nodes.map((_, i) => (i + 0.5) * ROW_H);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: '2.5rem' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color, letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
        INTERVIEW CONVERSATION MAP — CLICK NODES TO HIGHLIGHT
      </p>
      <div style={{
        background: '#070712',
        border: `1px solid ${color}25`,
        borderRadius: 12, overflow: 'hidden',
        overflowX: 'auto',
      }}>
        <svg
          width="100%" viewBox={`0 0 ${SVG_W} ${TOTAL_H + 20}`}
          style={{ display: 'block', minWidth: 640, fontFamily: 'var(--font-body)' }}
        >
          {/* Root dot */}
          <circle cx={ROOT_X} cy={CENTER_Y + 10} r={7} fill={color} />

          {nodes.map((node, i) => {
            const ny = nodeYs[i] + 10;
            const isActive = activeNode === node.id;

            return (
              <g key={node.id}>
                {/* Root to mid connector */}
                <path
                  d={`M ${ROOT_X} ${CENTER_Y + 10} C ${ROOT_X + 60} ${CENTER_Y + 10} ${MID_X - 60} ${ny} ${MID_X} ${ny}`}
                  fill="none"
                  stroke={isActive ? color : '#4a4a7a'}
                  strokeWidth={isActive ? 1.8 : 1}
                  style={{ transition: 'stroke 0.2s ease' }}
                />

                {/* Mid dot */}
                <circle
                  cx={MID_X} cy={ny} r={6}
                  fill={isActive ? color : '#2a2a4a'}
                  stroke={color} strokeWidth={1.5}
                  style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
                  onClick={() => setActiveNode(isActive ? null : node.id)}
                />

                {/* Mid label */}
                <text
                  x={MID_X - 14} y={ny - 10}
                  textAnchor="end" fill={isActive ? color : '#a0a0c0'}
                  fontSize="11.5" style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
                  onClick={() => setActiveNode(isActive ? null : node.id)}
                >
                  {node.label}
                </text>

                {/* Children */}
                {node.children.map((child, j) => {
                  const count = node.children.length;
                  const spread = (count - 1) * 18;
                  const cy2 = ny - spread / 2 + j * 18 + (count === 1 ? 0 : 0);

                  return (
                    <g key={j}>
                      <path
                        d={`M ${MID_X} ${ny} C ${MID_X + 60} ${ny} ${LEAF_X - 60} ${cy2} ${LEAF_X} ${cy2}`}
                        fill="none"
                        stroke={isActive ? `${color}90` : '#2e2e52'}
                        strokeWidth={isActive ? 1.4 : 0.9}
                        style={{ transition: 'stroke 0.2s ease' }}
                      />
                      {/* Leaf line */}
                      <line
                        x1={LEAF_X} y1={cy2}
                        x2={SVG_W - 20} y2={cy2}
                        stroke={isActive ? `${color}50` : '#1e1e3a'}
                        strokeWidth={isActive ? 1 : 0.7}
                        style={{ transition: 'stroke 0.2s ease' }}
                      />
                      <text
                        x={LEAF_X + 8} y={cy2 - 4}
                        fill={isActive ? '#d0d0f0' : '#5a5a8a'}
                        fontSize="11" style={{ transition: 'fill 0.2s ease' }}
                      >
                        {child}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
      <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
        Interview conducted with a Traffic Psychologist — Mahindra University, 2026
      </p>
    </motion.div>
  );
}

function YouTubePlayer({ color }) {
  const [playing, setPlaying] = useState(false);
  const videoId = 'BZUVKIkBLlQ';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ marginBottom: '2.5rem' }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color, letterSpacing: '0.12em', marginBottom: '1.25rem' }}>
        FULL INTERVIEW RECORDING — 23 MIN
      </p>
      <div style={{
        position: 'relative', width: '100%', paddingTop: '56.25%',
        background: '#07071 2', borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${color}25`,
      }}>
        {!playing ? (
          <div
            onClick={() => setPlaying(true)}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #07071a 0%, #0f0f28 100%)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: '1.25rem',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08 }}
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: color, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 40px ${color}60`,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#08080f">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                Traffic Psychologist Interview
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Click to play · 23 minutes · Unlisted
              </p>
            </div>
          </div>
        ) : (
          <iframe
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Psychologist Interview"
          />
        )}
      </div>
    </motion.div>
  );
}

function TimelinePhase({ phase, index, isActive, onClick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const x = useTransform(scrollYProgress, [0, 0.2], [index % 2 === 0 ? -30 : 30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} id={`phase-${index}`}>
      {/* Phase header */}
      <motion.div
        style={{ x }}
        onClick={onClick}
        whileHover={{ x: index % 2 === 0 ? 4 : -4 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '3rem', cursor: 'pointer',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%',
            background: `${phase.color}15`,
            border: `1px solid ${phase.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', flexShrink: 0,
          }}>
            {phase.icon}
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: phase.color, letterSpacing: '0.15em', marginBottom: '0.25rem',
            }}>
              {phase.phase}
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>
              {phase.title}
            </h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
              {phase.subtitle}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        {phase.content.map((item, i) => (
          <ContentCard key={i} item={item} phaseColor={phase.color} index={i} />
        ))}
      </div>

      {/* Survey charts for Phase 02 */}
      {phase.phase === 'Phase 02' && (
        <div style={{ marginBottom: '2rem' }}>
          <SurveyGallery color={phase.color} />
        </div>
      )}

      {/* Mind map + video for Phase 04 */}
      {phase.phase === 'Phase 04' && (
        <div style={{ marginBottom: '2rem' }}>
          <MindMap color={phase.color} />
          <YouTubePlayer color={phase.color} />
        </div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          background: `${phase.color}08`,
          border: `1px solid ${phase.color}30`,
          borderLeft: `3px solid ${phase.color}`,
          borderRadius: 8, padding: '1.5rem 2rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: phase.color, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          PHASE TAKEAWAY
        </p>
        <p style={{ color: 'var(--text-dim)', lineHeight: 1.7, fontStyle: 'italic' }}>
          "{phase.summary}"
        </p>
      </motion.div>
    </motion.div>
  );
}

function ContentCard({ item, phaseColor, index }) {
  const [expanded, setExpanded] = useState(false);

  const tagColor = item.color || phaseColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onClick={() => setExpanded(!expanded)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '1.5rem',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
      whileHover={{ borderColor: phaseColor, transition: { duration: 0.2 } }}
    >
      {/* Tag */}
      <span style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: tagColor, border: `1px solid ${tagColor}40`,
        borderRadius: 3, padding: '0.2rem 0.5rem',
        letterSpacing: '0.08em', marginBottom: '1rem',
      }}>
        {item.tag || item.type?.toUpperCase()}
      </span>

      {item.type === 'paper' && (
        <>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {item.title}
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
            {item.authors}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            {item.insight}
          </p>
        </>
      )}

      {item.type === 'news' && (
        <>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {item.title}
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            {item.source}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            {item.insight}
          </p>
        </>
      )}

      {item.type === 'insight' && (
        <>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: '3rem',
            fontWeight: 900, color: phaseColor, lineHeight: 1, marginBottom: '0.75rem',
          }}>
            {item.stat}
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', marginBottom: '0.5rem' }}>
            {item.title}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
            {item.detail}
          </p>
        </>
      )}

      {item.type === 'quote' && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `${phaseColor}20`, border: `1px solid ${phaseColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', flexShrink: 0,
            }}>
              {item.name[0]}
            </div>
            <div>
              <p style={{ fontWeight: 500, fontSize: '0.85rem' }}>{item.name}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.role}</p>
            </div>
          </div>
          <p style={{
            fontStyle: 'italic', fontSize: '0.88rem',
            color: 'var(--text-dim)', lineHeight: 1.65,
            borderLeft: `2px solid ${phaseColor}`, paddingLeft: '0.75rem',
            marginBottom: '1rem',
          }}>
            "{item.text}"
          </p>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: phaseColor, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                    KEY INSIGHT
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {item.insight}
                  </p>
                  <p style={{ fontSize: '0.65rem', color: phaseColor, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                    PROPOSED SOLUTIONS
                  </p>
                  {item.solutions?.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span style={{ color: phaseColor, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)' }}>{s}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            {expanded ? '↑ less' : '↓ expand'}
          </p>
        </>
      )}

      {item.type === 'theory' && (
        <>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: '0.4rem', lineHeight: 1.2 }}>
            {item.title}
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
            {item.author}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {item.text}
          </p>
          <div style={{
            background: `${phaseColor}10`, borderRadius: 4, padding: '0.75rem',
            borderLeft: `2px solid ${phaseColor}`,
          }}>
            <p style={{ fontSize: '0.65rem', color: phaseColor, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
              DESIGN IMPLICATION
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}>
              {item.implication}
            </p>
          </div>
        </>
      )}

      {item.type === 'synthesis' && (
        <>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            {item.title}
          </h4>
          <p style={{
            fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            "{item.text}"
          </p>
        </>
      )}
    </motion.div>
  );
}

export default function Journey() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
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
            THE RESEARCH JOURNEY
          </p>
          <h1 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontFamily: 'var(--font-display)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: '1.5rem',
          }}>
            From curiosity<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>to clarity</span>
          </h1>
          <p style={{
            fontSize: '1.05rem', color: 'var(--text-dim)',
            maxWidth: 560, lineHeight: 1.75, fontWeight: 300,
          }}>
            Four phases of research — papers, surveys, first-hand stories, and a psychologist's diagnosis — building toward a single, cohesive solution.
          </p>
        </motion.div>

        {/* Phase navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '3rem' }}
        >
          {phases.map((p, i) => (
            <a
              key={i}
              href={`#phase-${i}`}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: p.color, border: `1px solid ${p.color}40`,
                borderRadius: 4, padding: '0.4rem 0.9rem',
                letterSpacing: '0.08em', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${p.color}15`; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              {p.phase}: {p.title}
            </a>
          ))}
        </motion.div>
      </section>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>
        {/* Progress bar */}
        <div style={{
          position: 'fixed', top: 0, left: 0, width: 3,
          height: '100vh', background: 'var(--surface2)', zIndex: 100,
        }}>
          <motion.div style={{
            width: '100%', height: progressHeight,
            background: 'linear-gradient(var(--accent), var(--accent2))',
          }} />
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem 3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
            {phases.map((phase, i) => (
              <TimelinePhase
                key={i}
                phase={phase}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Transition to prototype */}
      <section style={{
        padding: '6rem 2rem', textAlign: 'center',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
            WHAT CAME NEXT
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
            The research pointed us<br />
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>to a single insight.</span>
          </h2>
          <p style={{ color: 'var(--text-dim)', maxWidth: 520, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Students don't need more awareness. They need real-time intervention — at the exact moment and location of danger.
          </p>
          <a href="/prototype" style={{
            display: 'inline-block',
            background: 'var(--accent)', color: '#08080f',
            padding: '1rem 2.5rem', borderRadius: 4,
            fontFamily: 'var(--font-body)', fontWeight: 500,
            fontSize: '0.9rem', letterSpacing: '0.04em',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
          >
            See the Prototype →
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
}
