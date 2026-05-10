"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // 1. "Directing & Editing" comes from above
      tl.from(".hero-sub", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. "Kishan" comes from left
      tl.from(textRef.current, {
        x: -150,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.out"
      }, "-=0.7");

      // 3. "STUDIO" comes from right
      tl.from(".studio-tag", {
        x: 150,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1.2");

      // 4. Bottom tags come from down (like About section)
      tl.from(".hero-tag", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={containerRef} className="hero-section hero-bg" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
    }}>
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h3 className="hero-sub" style={{ 
          fontSize: "0.85rem", 
          fontWeight: 700, 
          letterSpacing: "0.25em", 
          marginBottom: "1.5rem", 
          color: "#fff",
          opacity: 0.6,
          textTransform: 'uppercase'
        }}>
          Directing & Editing
        </h3>
        <h1 ref={textRef} className="glow-text" style={{
          fontSize: 'clamp(5rem, 35vw, 55vh)',
          lineHeight: 0.85,
          fontWeight: 400,
          fontFamily: "'Bebas Neue', sans-serif",
          color: '#fff',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '-0.02em',
          width: '95vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          textTransform: 'uppercase',
          willChange: 'transform, filter, opacity'
        }}>
          Kishan
          
          <span className="studio-tag" style={{
            position: 'absolute',
            left: '21%',
            bottom: '0%',
            fontSize: 'clamp(1rem, 4vw, 5rem)',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            letterSpacing: '0.1em',
            color: '#0066FF',
            textShadow: '0 0 20px rgba(0, 102, 255, 0.4)'
          }}>
            STUDIO
          </span>
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginTop: '20px',
          fontSize: '1rem',
          letterSpacing: '0.5em',
          opacity: 0.5,
          textTransform: 'uppercase'
        }}>
          <span className="hero-tag">Visuals</span>
          <span className="hero-tag">Storytelling</span>
          <span className="hero-tag">Impact</span>
        </div>
      </div>
    </section>
  );
}
