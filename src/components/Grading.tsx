"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: "COLOUR GRADING", likes: "188", image: "/assets/grading.png" },
  { id: 2, title: "CINEMATIC LOOK", likes: "245", image: "/assets/grading.png" },
  { id: 3, title: "VINTAGE FILM", likes: "512", image: "/assets/grading.png" },
  { id: 4, title: "URBAN MOOD", likes: "120", image: "/assets/grading.png" },
];

export default function Grading() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".grading-card") as HTMLElement[];
      
      // Initial setup for the fanned-out stack look
      cards.forEach((card: any, i: number) => {
        gsap.set(card, {
          y: -i * 35, // Staggered upwards
          scale: 1 - (i * 0.04), // Slightly smaller behind
          opacity: i < 4 ? 1 : 0, // Only show first few in the stack preview
          zIndex: cards.length - i
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${cards.length * 150}%`, // Reduced for faster scroll
          pin: true,
          scrub: 1,
        }
      });

      // 1. Intro Animation: First card zooms out from large/invisible to position
      tl.fromTo(cards[0], 
        { scale: 3, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
      );
      
      // Bring in the rest of the stack preview subtly
      tl.fromTo(cards.slice(1),
        { opacity: 0 },
        { opacity: 1, stagger: 0.1, duration: 0.5 },
        "<0.5"
      );

      cards.forEach((card: any, i: number) => {
        if (i < cards.length - 1) {
          // Current card falls down FAST
          tl.to(card, {
            y: "120vh",
            opacity: 0,
            scale: 0.9,
            rotation: 5,
            duration: 0.6, // Faster drop
            ease: "power3.in"
          });

          // All subsequent cards move forward in the stack FAST
          const nextCards = cards.slice(i + 1);
          nextCards.forEach((nextCard: any, nextIndex: number) => {
            tl.to(nextCard, {
              y: -nextIndex * 35,
              scale: 1 - (nextIndex * 0.04),
              duration: 0.6,
              ease: "power2.out"
            }, "<"); 
          });

          // Small gap between drops
          tl.to({}, { duration: 0.3 });
        }
      });

      // 2. Outro Animation: Last card zooms in
      tl.to(cards[cards.length - 1], {
        scale: 3,
        opacity: 0,
        duration: 1,
        ease: "power3.in"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    
    <section ref={containerRef} className="grading-section" style={{
      background: '#fff',
      position: 'relative',
      zIndex: 10,
      height: '100vh',
      overflow: 'hidden'
    }}>
      {projects.map((project, i) => (
        <div key={project.id} className="grading-card" style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          background: '#000',
          zIndex: projects.length - i,
          willChange: 'transform, opacity'
        }}>
          <div style={{
            position: 'relative',
            width: '85vw',
            maxWidth: '1200px',
            height: '70vh',
            borderRadius: '30px',
            overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: 'cover' }}
            />

            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ 
                  fontSize: "0.85rem", 
                  fontWeight: 700, 
                  letterSpacing: "0.15em", 
                  marginBottom: "0.5rem", 
                  color: "#fff",
                  opacity: 0.6,
                  textTransform: 'uppercase'
                }}>
                  Visual Style
                </h3>
                <h2 style={{ 
                  fontSize: '10vw', 
                  fontWeight: 900,
                  textAlign: 'center', 
                  textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  lineHeight: 0.8,
                  color: '#fff',
                  textTransform: 'uppercase'
                }}>
                  {project.title.split(' ')[0]}<br/>
                  <span style={{ color: 'rgba(255,255,255,0.3)' }}>{project.title.split(' ')[1]}</span>
                </h2>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              right: '40px',
              bottom: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '25px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  color: '#FF4D4D',
                  marginBottom: '8px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  ❤
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Likes</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  color: '#fff',
                  marginBottom: '8px',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  ○
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>{project.likes}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
