"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// More items to make the gap smaller
const originalSkills = [
  { name: "Premiere Pro", icon: "/assets/premiere-pro.png", color: "#2B2B4F" },
  { name: "CapCut", icon: "/assets/capcut.png", color: "#000000" },
  { name: "After Effects", icon: "/assets/after-effects.png", color: "#2B2B4F" },
  { name: "Illustrator", icon: "/assets/illustrator.png", color: "#330000" },
  { name: "Audition", icon: "/assets/adobe-audition.png", color: "#2B2B4F" },
  { name: "Photoshop", icon: "/assets/photoshop.png", color: "#001E36" },
  { name: "Final Cut", icon: "/assets/finalcut.png", color: "#111" },
];

// Create a larger list by repeating to ensure enough items for a tight circle
const skills = Array.from({ length: 20 }, (_, i) => originalSkills[i % originalSkills.length]);

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const skillNameRef = useRef<HTMLDivElement>(null);

  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blobs animation
      [blob1Ref, blob2Ref].forEach((ref, i) => {
        gsap.to(ref.current, {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(10, 20)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2,
        });
      });

      const items = gsap.utils.toArray(".skill-item") as HTMLElement[];
      const radius = 1100; // Increased radius for smoother curve
      const angleStep = (Math.PI * 2) / items.length;

      items.forEach((item: any, i: number) => {
        // Start index 0 at Math.PI (the leftmost point/apex)
        const angle = i * angleStep + Math.PI;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        gsap.set(item, {
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          x: x,
          y: y,
          rotation: (angle * 180) / Math.PI + 90,
        });
      });

      let lastIndex = -1;

      // Create a master timeline for the section
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const rotation = gsap.getProperty(circleRef.current, "rotation") as number;
            const totalItems = items.length;
            const normalizedRotation = rotation % 360;
            const index = Math.round((totalItems - (normalizedRotation / 360) * totalItems)) % totalItems;
            const safeIndex = index < 0 ? index + totalItems : index;

            if (safeIndex !== lastIndex) {
              lastIndex = safeIndex;
              const currentSkill = skills[safeIndex];
              if (skillNameRef.current && currentSkill) {
                gsap.to(skillNameRef.current, {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.1,
                  overwrite: true,
                  onComplete: () => {
                    if (skillNameRef.current) {
                      skillNameRef.current.innerText = currentSkill.name;
                      gsap.to(skillNameRef.current, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "back.out(2)",
                        overwrite: true
                      });
                    }
                  }
                });
              }
            }
          }
        }
      });

      // 1. Reveal from right side
      mainTl.from([".skills-heading", ".skill-name-container", circleRef.current], {
        x: 1500,
        opacity: 0,
        duration: 2,
        stagger: 0.2,
        ease: "power4.out"
      });

      // 2. Continuous rotation
      mainTl.to(circleRef.current, {
        rotation: 360,
        ease: "none",
        duration: 10, // Proportional distance in the scrub
      }, "-=0.5");

      // 3. Exit back to right side
      mainTl.to([".skills-heading", ".skill-name-container", circleRef.current], {
        x: 1500,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
        ease: "power4.in"
      }, ">");

      // 4. Final pause for blank scroll space before unpinning
      mainTl.to({}, { duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>

      <section ref={containerRef} className="skills-section" style={{
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8vw',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Moving Gradient Blobs */}
        <div
          ref={blob1Ref}
          className="electric-blob"
          style={{
            width: "800px",
            height: "800px",
            background: "rgba(0, 85, 255, 0.7)",
            top: "50%",
            right: "-20%",
            transform: "translateY(-50%)",
            animation: "blobFloat1 12s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        <div
          ref={blob2Ref}
          className="electric-blob"
          style={{
            width: "600px",
            height: "600px",
            background: "rgba(0, 102, 255, 0.58)",
            top: "20%",
            right: "10%",
            animation: "blobFloat2 10s ease-in-out infinite",
            willChange: "transform",
          }}
        />

        <div className="skills-heading" style={{ zIndex: 10, width: '35%' }}>
          <h3 style={{
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            marginBottom: "1.2rem",
            color: "#fff",
            opacity: 0.6
          }}>
            CAPABILITIES
          </h3>
          <h2 style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: '0.9',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase'
          }}>
            SOFTWARE<br />SKILLS
          </h2>
        </div>

        {/* Current Skill Name - Centered between heading and circle */}
        <div className="skill-name-container" style={{
          zIndex: 10,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          paddingRight: '12vw' // Offset to move away from circle
        }}>
          <div ref={skillNameRef} style={{
            fontSize: '1.5rem', // Smaller text to match reference
            color: '#fff',
            opacity: 1,
            fontWeight: 500,
            textAlign: 'center',
            letterSpacing: '0.02em',
            willChange: 'transform, opacity'
          }}>
            Premiere Pro
          </div>
        </div>

        {/* Rotating Skill Icons Circle */}
        <div ref={circleRef} style={{
          position: 'absolute',
          right: '-850px', // Shifted right to fit the larger radius
          top: '50%',
          width: '100px',
          height: '100px',
          marginTop: '-50px',
          borderRadius: '50%',
          zIndex: 5,
          willChange: 'transform'
        }}>
          {skills.map((skill, i) => (
            <div key={i} className="skill-item" style={{
              position: 'absolute',
              width: '200px', // Larger icons as in reference
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              userSelect: 'none'
            }}>
              <img
                src={skill.icon}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  rotate: '90deg',
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
