"use client";

import { useEffect, useState } from "react";

export default function Hero() {
    // Add new slides here to expand the slideshow later.
    // Each item should include a src and an alt description.
    const slides = [
        {
            src: "3.jpg",
            alt: "Hero image showcasing our work, 1",
        },
        {
            src: "sandy-lane-snippet.jpg",
            alt: "Hero image showcasing our work, 2",
        },
        {
            src: "Canouan-marina.jpg",
            alt: "Hero image showcasing our work, 3",
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        // Auto-advance the slideshow every 5 seconds.
        // To add more images, add more entries to the slides array above.
        const interval = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slides.length);
        }, 5000);

        return () => window.clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="flex h-[90vh] w-full flex-col gap-6 px-4 py-4 sm:flex-row sm:items-center sm:gap-8 sm:px-6 sm:py-6 lg:px-8">
            <div className="flex w-full flex-col justify-center sm:w-1/3">
                <h1 className="max-w-[14rem] text-[clamp(3.25rem,10vw,6rem)] font-semibold leading-[0.9] tracking-tight text-white sm:max-w-none">
                    Bringing Your Ideas to Life.
                </h1>
                <p className="mt-4 max-w-[20rem] text-sm leading-relaxed text-white/90 sm:max-w-none sm:text-base sm:text-lg">
                    Architecture - Project Management - Construction - Automation
                </p>
            </div>

            <div className="relative h-[280px] w-full overflow-hidden rounded-[1.5rem] border border-white/20 bg-black/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:h-[min(70vh,560px)] sm:w-2/3">
                {slides.map((slide, index) => (
                    <img
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                            index === activeIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 flex gap-2">
                    {slides.map((slide, index) => (
                        <span
                            key={`${slide.src}-${index}`}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${
                                index === activeIndex ? "bg-white scale-110" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
