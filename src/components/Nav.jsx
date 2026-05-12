import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { path: '/', label: 'Home', sub: 'Problem Statement' },
  { path: '/journey', label: 'Journey', sub: 'Our Research Process' },
  { path: '/prototype', label: 'Prototype', sub: 'The Solution' },
  { path: '/about', label: 'About Us', sub: 'Team Canvascrew' },
];

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          padding: '0 2.5rem',
          height: scrolled ? '60px' : '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(232,197,71,0.08)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          <div style={{
            width: 32, height: 32, border: '1.5px solid var(--accent)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 7L7 13L1 7L7 1Z" stroke="#e8c547" strokeWidth="1.2"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.02em' }}>
            Canvascrew
          </span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
          {links.map(link => {
            const active = location.pathname === link.path;
            return (
              <div
                key={link.path}
                onMouseEnter={() => setHovered(link.path)}
                onMouseLeave={() => setHovered(null)}
                style={{ position: 'relative' }}
              >
                <button
                  onClick={() => navigate(link.path)}
                  style={{
                    background: 'none', border: 'none',
                    color: active ? 'var(--accent)' : 'var(--text-dim)',
                    fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                    fontWeight: active ? 500 : 400,
                    letterSpacing: '0.04em',
                    padding: '0.5rem 1rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute', bottom: 2, left: '1rem', right: '1rem',
                        height: '1px', background: 'var(--accent)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hovered === link.path && !active && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 6, padding: '0.4rem 0.75rem',
                        whiteSpace: 'nowrap', pointerEvents: 'none',
                        fontSize: '0.72rem', color: 'var(--text-dim)',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {link.sub}
                      <div style={{
                        position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)',
                        width: 8, height: 8, background: 'var(--surface)',
                        border: '1px solid var(--border)', borderBottom: 'none', borderRight: 'none',
                        transform: 'translateX(-50%) rotate(45deg)',
                      }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'var(--text)', cursor: 'pointer', padding: '0.5rem',
          }}
          className="hamburger"
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1.5"/>
            <line x1={menuOpen ? "0" : "4"} y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '75vw', maxWidth: 320,
              background: 'var(--surface)', zIndex: 490,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: '2rem', gap: '1rem',
              borderLeft: '1px solid var(--border)',
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link.path}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => navigate(link.path)}
                style={{
                  background: 'none', border: 'none',
                  color: location.pathname === link.path ? 'var(--accent)' : 'var(--text)',
                  fontFamily: 'var(--font-display)', fontSize: '1.4rem',
                  textAlign: 'left', padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .hamburger { display: flex !important; }
          nav > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </>
  );
}
