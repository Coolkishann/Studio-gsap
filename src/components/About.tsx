"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animation for all elements with .reveal class
      gsap.from(".reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Subtle pulse for the blue glow
      gsap.to(".blue-glow", {
        scale: 1.05,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8vw 5vw",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="about-grid">
        {/* LEFT SIDE: Portrait and Intro */}
        <div className="about-portrait-wrapper" style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
          {/* Blue Glow Background */}
          <div
            className="blue-glow"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: "10%",
              left: "0",
              background:
                "radial-gradient(circle, rgba(0,85,255,0.7) 0%, rgba(0,50,150,0.3) 40%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: 1,
              borderRadius: "50%",
              animation: "floatGlow 8s ease-in-out infinite",
              willChange: "transform",
            }}
          />

          {/* Intro Text Overlay */}
          <div className="reveal" style={{
            position: "absolute",
            top: "5%",
            left: "5%",
            zIndex: 10,
            width: "90%"
          }}>
            <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", opacity: 0.9, marginBottom: "0.2rem", fontWeight: 500 }}>Hello, I am</p>
            <h1 style={{
              fontSize: "clamp(2.5rem, 10vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: "0.8rem",
              letterSpacing: "-0.02em"
            }}>
              M.Kishan
            </h1>
            <p style={{ fontSize: "clamp(0.7rem, 2vw, 0.85rem)", opacity: 0.8, letterSpacing: "0.1em", fontWeight: 600, color: "#0055ff" }}>
              Video Editor | Videographer | Content Creator
            </p>
          </div>

          {/* Portrait Image */}
          <div className="person-image reveal" style={{
            position: "absolute",
            // bottom: "-20%",
            left: "-10%",
            width: "120%",
            height: "120%",
            zIndex: 5
          }}>
            <Image
              src="/assets/hero1.png"
              alt="M. Kishan"
              fill
              style={{
                objectFit: "contain",
                objectPosition: "bottom center",
              }}
            />
          </div>
        </div>

        {/* RIGHT SIDE: Content Sections */}
        <div className="about-content-stack">

          {/* ABOUT ME Section */}
          <div className="reveal">
            <h3 style={{
              fontSize: "1.1rem",
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginBottom: "1.5rem",
              color: "#fff",
              opacity: 0.9
            }}>
              ABOUT ME
            </h3>
            <p style={{
              fontSize: "1.1rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.9)",
              textAlign: "left",
              maxWidth: "600px",
              fontWeight: 400
            }}>
              I'm a creative Video Editor and Visual Content Creator with 4+ years of experience in media production. I work across videography, photography, audio editing, and post-production, handling complete projects from idea to final output. My focus is on storytelling, creativity, and delivering content that stands out. I enjoy transforming simple ideas into engaging visuals that leave a lasting impact.
            </p>
          </div>

          {/* Inner Grid for Education and Experience */}
          <div className="reveal education-grid">

            {/* EDUCATION */}
            <div>
              <h3 style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                marginBottom: "1.5rem",
                opacity: 0.9
              }}>
                EDUCATION
              </h3>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem", color: "#0055ff" }}>2023 - 2024</p>
              <p style={{ fontSize: "1.1rem", opacity: 0.9, lineHeight: 1.5, fontWeight: 500 }}>
                Pre Engineering<br />(FSC)
              </p>
            </div>

            {/* WORK EXPERIENCE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              <h3 style={{
                fontSize: "1.1rem",
                fontWeight: 800,
                letterSpacing: "0.2em",
                marginBottom: "-0.5rem",
                opacity: 0.9
              }}>
                WORK EXPERIENCE
              </h3>

              {/* Exp 1 */}
              <div>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem", color: "#0055ff" }}>2022 - 2023</p>
                <p style={{ fontSize: "1.1rem", opacity: 1, marginBottom: "0.6rem", fontWeight: 600 }}>Freelance Video Editor (Remote)</p>
                <ul style={{ fontSize: "1rem", opacity: 0.7, paddingLeft: "1.2rem", lineHeight: 1.6 }}>
                  <li>Edited social media content (YouTube, Instagram, TikTok)</li>
                  <li>Delivered high-quality, storytelling-based videos on time</li>
                </ul>
              </div>

              {/* Exp 2 */}
              <div>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem", color: "#0055ff" }}>2024 - 2025</p>
                <p style={{ fontSize: "1.1rem", opacity: 1, marginBottom: "0.6rem", fontWeight: 600 }}>Wedding Videographer & Video Editor</p>
                <ul style={{ fontSize: "1rem", opacity: 0.7, paddingLeft: "1.2rem", lineHeight: 1.6 }}>
                  <li>Captured working events (Mehendi, Barat, Valima)</li>
                  <li>Edited cinematic highlights, reels, and full wedding videos</li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}