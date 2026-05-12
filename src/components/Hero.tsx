"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLHeadingElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline({ delay: 0.5 });

      tl.from(subTextRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      tl.from(textRef.current, {
        x: -150,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.out"
      }, "-=0.7");

      tl.from(".hero-tag", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }, "-=0.5");

      // Parallax Animations on Scroll
      gsap.to(subTextRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: -50,
        opacity: 0,
        ease: "none"
      });

      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: -150,
        scale: 0.9,
        ease: "none"
      });

      gsap.to(tagsRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: -80,
        opacity: 0.3,
        ease: "none"
      });
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
        <h3 ref={subTextRef} className="hero-sub" style={{ 
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
          fontSize: 'clamp(4rem, 25vw, 55vh)',
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
          
          {/* <span className="studio-tag">
            STUDIO
          </span> */}
        </h1>

        <div ref={tagsRef} className="hero-tag-container" style={{
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
