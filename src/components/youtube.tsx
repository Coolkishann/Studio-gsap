"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Mic } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const slides = [
  {
    type: "search",
    text: "Need Pro Video Editing Service",
  },
  {
    type: "search",
    text: "Kishan Visual Editing Studio",
  },
  {
    type: "text",
    text: "200+ Satisfied Clients",
  },
  {
    type: "text",
    text: "I'll Manage Your Projects From Beginning to End.",
  },
];

export default function LayeredScrollShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ytIconRef = useRef<HTMLDivElement>(null);
  const ytTriangleRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const typingRefs = useRef<HTMLDivElement[]>([]);

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ----------------------------
      // Initial States
      // ----------------------------
      gsap.set(videoRef.current, {
        scale: 1,
        opacity: 1,
      });

      gsap.set(ytIconRef.current, {
        scale: 40,
        opacity: 1,
      });

      gsap.set(ytTriangleRef.current, {
        fill: "white", // Start with white triangle
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: 20,
      });

      gsap.set(slidesRef.current, {
        opacity: 0,
        scale: 0.95,
      });

      // ----------------------------
      // Main Timeline
      // ----------------------------
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (slides.length + 3)}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 0: Transition from white to dark and zoom out YT icon
      tl.to(sectionRef.current, {
        backgroundColor: "#020812",
        duration: 1.5,
        ease: "power2.inOut",
      }, 0);

      tl.to(ytIconRef.current, {
        scale: 1,
        duration: 2,
        ease: "power4.inOut",
      }, 0);

      tl.to(ytTriangleRef.current, {
        fill: "#020812", // Transition triangle to dark
        duration: 1.5,
        ease: "power2.inOut",
      }, 0.5);

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5");

      // Step 1: Video fades and zooms out
      tl.to([videoRef.current, contentRef.current], {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      }, "+=0.5");

      // Step 2: Each slide appears one by one
      slides.forEach((_, i) => {
        tl.call(() => {
          setActiveIndex(i);

          // Reset all typing content
          typingRefs.current.forEach((el, index) => {
            if (el && index !== i) el.textContent = "";
          });

          // Type current text
          if (typingRefs.current[i]) {
            gsap.killTweensOf(typingRefs.current[i]);
            gsap.to(typingRefs.current[i], {
              duration: slides[i].text.length * 0.03,
              text: slides[i].text,
              ease: "none",
            });
          }
        });

        tl.to(slidesRef.current[i], {
          opacity: 1,
          scale: 1,
          duration: 0.6,
        });

        tl.to(
          {},
          {
            duration: 1.6, // hold slide on screen
          }
        );

        tl.to(slidesRef.current[i], {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        // background: "#fff", // Start with white
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Blue Glow Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 15% 85%, rgba(0,80,255,0.25), transparent 35%),
            radial-gradient(circle at 85% 20%, rgba(0,80,255,0.35), transparent 30%),
            radial-gradient(circle at center, rgba(0,20,120,0.15), transparent 55%)
          `,
          filter: "blur(30px)",
          opacity: activeIndex >= 0 ? 1 : 0, // Only show glow after intro
        }}
      />

      {/* Video Section / Intro Content */}
      <div
        ref={videoRef}
        style={{
          position: "absolute",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div ref={ytIconRef} style={{ color: "#fff", willChange: 'transform' }}>
          <svg
            width="120"
            height="84"
            viewBox="0 0 120 84"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ willChange: 'transform' }}
          >
            <path
              d="M117.2 13.1C115.8 8.2 111.9 4.3 107 2.9C97.6 0.4 60 0.4 60 0.4C60 0.4 22.4 0.4 13 2.9C8.1 4.3 4.2 8.2 2.8 13.1C0.3 22.5 0.3 42.1 0.3 42.1C0.3 42.1 0.3 61.7 2.8 71.1C4.2 76 8.1 79.9 13 81.3C22.4 83.8 60 83.8 60 83.8C60 83.8 97.6 83.8 107 81.3C111.9 79.9 115.8 76 117.2 71.1C119.7 61.7 119.7 42.1 119.7 42.1C119.7 42.1 119.7 22.5 117.2 13.1Z"
              fill="white"
            />
            <path ref={ytTriangleRef} d="M48 60.1V24.1L79.2 42.1L48 60.1Z" fill="#020812" />
          </svg>
        </div>
        
        <div ref={contentRef} style={{ textAlign: "center" }}>
          <h3 style={{ 
            fontSize: "0.85rem", 
            fontWeight: 700, 
            letterSpacing: "0.15em", 
            marginBottom: "1rem", 
            color: "#fff",
            opacity: 0.6
          }}>
            POST PRODUCTION
          </h3>
          <h2 style={{ 
            color: "#fff", 
            fontSize: "clamp(2.5rem, 5vw, 4rem)", 
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textTransform: "uppercase"
          }}>
            VIDEO <span style={{ color: "rgba(255,255,255,0.4)" }}>EDITING</span>
          </h2>
        </div>
      </div>

      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) slidesRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            zIndex: 3,
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {slide.type === "search" ? (
            <div
              style={{
                width: "min(700px, 80vw)",
                height: "60px",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(8px)",
                color: "#fff",
              }}
            >
              <div
                ref={(el) => {
                  if (el) typingRefs.current[i] = el;
                }}
                style={{
                  flex: 1,
                  padding: "0 20px",
                  fontSize: "1.1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              />
              <div
                style={{
                  width: "60px",
                  borderLeft: "1px solid rgba(255,255,255,0.15)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Search size={20} color="white" />
              </div>
              <div
                style={{
                  width: "50px",
                  display: "grid",
                  placeItems: "center",
                  opacity: 0.8,
                }}
              >
                <Mic size={18} color="white" />
              </div>
            </div>
          ) : (
            <div
              ref={(el) => {
                if (el) typingRefs.current[i] = el;
              }}
              style={{
                color: "#fff",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                fontWeight: 700,
                textAlign: "center",
                maxWidth: "900px",
                lineHeight: 1.3,
              }}
            />
          )}
        </div>
      ))}
    </section>
  );
}