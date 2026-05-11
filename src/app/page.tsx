"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Grading from "@/components/Grading";
import VideoPostProduction from "@/components/youtube";

import Footer from "@/components/Footer";

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
      <div className="branding-fixed">
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

      <Footer />
    </main>
  );
}