import React, { useEffect, useRef } from 'react';

export const BackgroundEffects: React.FC = () => {
  const auraRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const trail = trailRef.current;
    if (!aura || !trail) return;

    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let trailX = -500;
    let trailY = -500;
    let prevX = -500;
    let prevY = -500;
    let isVisible = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        aura.style.opacity = '0.6';
        trail.style.opacity = '0.45';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      aura.style.opacity = '0';
      trail.style.opacity = '0';
    };

    // 60fps/120fps VSync-synchronized physics render loop
    const render = () => {
      // Primary aura follow
      const auraEase = 0.08;
      currentX += (targetX - currentX) * auraEase;
      currentY += (targetY - currentY) * auraEase;

      // Trailing motion blur element follow
      const trailEase = 0.18;
      trailX += (targetX - trailX) * trailEase;
      trailY += (targetY - trailY) * trailEase;

      // Calculate instantaneous velocity for optical motion blur stretch
      const vx = targetX - prevX;
      const vy = targetY - prevY;
      prevX = targetX;
      prevY = targetY;

      const speed = Math.hypot(vx, vy);
      const angle = Math.atan2(vy, vx);

      // Dynamic stretch & blur calculation
      const stretch = Math.min(1 + speed * 0.04, 2.2);
      const squeeze = Math.max(1 - speed * 0.015, 0.65);
      const dynamicBlur = Math.min(30 + speed * 1.2, 80);

      // Transform aura with directional motion blur elongation
      aura.style.transform = `translate3d(${currentX - 160}px, ${currentY - 160}px, 0) rotate(${angle}rad) scale(${stretch}, ${squeeze})`;
      aura.style.filter = `blur(${dynamicBlur}px)`;

      // Trailing motion blur wake
      trail.style.transform = `translate3d(${trailX - 40}px, ${trailY - 40}px, 0) rotate(${angle}rad) scale(${Math.min(1 + speed * 0.06, 3)}, 1)`;
      trail.style.filter = `blur(${Math.min(12 + speed * 0.6, 35)}px)`;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Editorial Dot Grid */}
      <div className="dot-grid" />

      {/* Dynamic Motion-Blurred Ambient Aura */}
      <div
        ref={auraRef}
        className="hidden md:block absolute top-0 left-0 w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-[#2563eb]/20 via-[#3b82f6]/10 to-transparent opacity-0 transition-opacity duration-300 will-change-transform pointer-events-none"
        style={{
          transform: 'translate3d(-500px, -500px, 0)',
        }}
      />

      {/* Motion Blur Kinetic Trail */}
      <div
        ref={trailRef}
        className="hidden md:block absolute top-0 left-0 w-[80px] h-[80px] rounded-full bg-[var(--accent)]/30 opacity-0 transition-opacity duration-200 will-change-transform pointer-events-none"
        style={{
          transform: 'translate3d(-500px, -500px, 0)',
        }}
      />
    </div>
  );
};
