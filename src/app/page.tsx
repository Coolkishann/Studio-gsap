"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Grading from "@/components/Grading";
import VideoPostProduction from "@/components/youtube";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Fix for initial load issues and hydration
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main style={{ background: "#000", position: "relative" }}>
      {/* Fixed Name - Bottom Left */}
      <div
        style={{
          position: "fixed",
          left: "30px",
          bottom: "24px",
          zIndex: 9999,
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          opacity: 0.85,
          pointerEvents: "none", // prevents blocking clicks
          userSelect: "none",
        }}
      >
        M. Kishan
        <br />
        Video Editor & Director
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
        <About />
      </div>

      <div style={{ position: "relative", zIndex: 3 }}>
        <Skills />
      </div>

      <div style={{ position: "relative", zIndex: 5 }}>
        <Grading />
      </div>
      <div style={{ position: "relative", zIndex: 4 }}>
        <VideoPostProduction />
      </div>

      {/* Footer / Contact */}
      {/* <section
        style={{
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          borderTop: "1px solid #111",
          position: "relative",
          zIndex: 5,
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            color: "var(--primary)",
            marginBottom: "20px",
          }}
        >
          LET&apos;S CONNECT
        </h2>

        <p style={{ opacity: 0.6 }}>kishan@example.com</p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
          }}
        >
          <a
            href="#"
            style={{
              opacity: 0.8,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Instagram
          </a>
          <a
            href="#"
            style={{
              opacity: 0.8,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            YouTube
          </a>
          <a
            href="#"
            style={{
              opacity: 0.8,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            LinkedIn
          </a>
        </div>
      </section> */}
    </main>
  );
}