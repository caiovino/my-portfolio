"use client";
import { useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import MorphingBackground from "@/components/MorphingBackground";

export default function Home() {
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative h-screen overflow-hidden bg-gray-900" style={{ scrollBehavior: "smooth" }}>
      {/* Animated morphing gradient background with blur and ambient color mixing. */}
      <div className="absolute inset-0 z-0">
        <MorphingBackground />
      </div>

      <div className="relative z-20 flex h-full flex-col">
        <div className="sticky top-0 z-40 flex w-full items-center gap-3 bg-zinc-900/20 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-1 items-center gap-3">
            <img
              src="/LineSquare08aVectorized.svg"
              alt="Logo"
              className="h-8 w-auto shrink-0 sm:h-10"
            />
            <div className="flex flex-1 items-stretch gap-2">
              <a
                href="#about"
                className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden rounded px-2 py-2 text-center text-sm font-medium text-white no-underline shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-3 sm:py-2.5 sm:text-base"
              >
                <span className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden opacity-100 text-center" />
                <span className="relative z-10">About</span>
              </a>
              <a
                href="#projects"
                className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden rounded px-2 py-2 text-center text-sm font-medium text-white no-underline shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-3 sm:py-2.5 sm:text-base"
              >
                <span className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden opacity-100 text-center" />
                <span className="relative z-10">Projects</span>
              </a>
              <a
                href="#contact"
                className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden rounded px-2 py-2 text-center text-sm font-medium text-white no-underline shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-3 sm:py-2.5 sm:text-base"
              >
                <span className="group relative flex flex-1 basis-0 items-center justify-center overflow-hidden opacity-100 text-center" />
                <span className="relative z-10">Contact</span>
              </a>
            </div>
          </div>
        </div>

        <div
          ref={scrollViewportRef}
          className="relative z-10 flex-1 scrollbar-none overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8"
        >
          <div className="relative z-10 space-y-8 pt-0">
            <div className="sticky top-0 z-10 h-screen">
              <Hero />
            </div>
            <About />
            <Projects />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
