import { useEffect, useRef } from 'react';

export default function GridDistortion({
  cols = 20,
  rows = 15,
  lineColor = 'rgba(232,197,71,0.045)',
}) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const r = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * r;
      canvas.height = h * r;
      ctx.setTransform(r, 0, 0, r, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMove);

    let t = 0;
    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.07;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.07;
      const mx = smooth.current.x;
      const my = smooth.current.y;

      const cw = w / cols;
      const ch = h / rows;
      const radius = Math.min(w, h) * 0.42;
      const strength = 28;

      const warp = (px, py) => {
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - dist / radius);
        const wave = Math.sin(dist * 0.018 - t * 2.2) * inf * 14;
        return {
          x: px - dx * inf * 0.13 + wave,
          y: py - dy * inf * 0.13 + wave * 0.55,
        };
      };

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const { x, y } = warp(i * cw, j * ch);
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const { x, y } = warp(i * cw, j * ch);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.016;
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
    };
  }, [cols, rows, lineColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
