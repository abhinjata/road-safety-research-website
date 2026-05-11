import { useEffect, useRef } from 'react';

const PALETTE = ['#e8c547', '#f0855a', '#7eb8d4', '#c47eb5', '#e8e4dc'];
const SPARK_COUNT = 10;
const LIFETIME = 550;
const MAX_DIST = 55;
const SPARK_RADIUS = 3;

export default function ClickSpark({ children }) {
  const canvasRef = useRef(null);
  const groups = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();
      groups.current = groups.current.filter(g => now - g.born < LIFETIME);

      groups.current.forEach(g => {
        const t = (now - g.born) / LIFETIME;
        const ease = 1 - t * t;
        const dist = t * MAX_DIST;

        ctx.fillStyle = g.color;
        g.sparks.forEach(s => {
          ctx.save();
          ctx.globalAlpha = ease * 0.88;
          ctx.beginPath();
          ctx.arc(
            g.x + Math.cos(s.angle) * dist,
            g.y + Math.sin(s.angle) * dist,
            SPARK_RADIUS * (1 - t * 0.65),
            0,
            Math.PI * 2,
          );
          ctx.fill();
          ctx.restore();
        });
      });

      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onClick = e => {
      groups.current.push({
        x: e.clientX,
        y: e.clientY,
        born: performance.now(),
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        sparks: Array.from({ length: SPARK_COUNT }, (_, i) => ({
          angle: (i / SPARK_COUNT) * Math.PI * 2 + Math.random() * 0.25,
        })),
      });
    };
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
      />
      {children}
    </>
  );
}
