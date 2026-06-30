"use client";

import { useEffect, useState } from "react";

type ProjectOption = {
    image: string;
    label: string;
};

type ProjectDetails = {
    image: string;
    label: string;
    // subImages contains the duplicate preview images for this project.
    // Add or remove entries here to customize the sub-image pager.
    subImages: string[];
};

const projectOptions: ProjectOption[] = [
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project One" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Two" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Three" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Four" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Five" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Six" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Seven" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Eight" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Nine" },
    { image: "/pexels-iamiliaafsharpoor-28961068.jpg", label: "Project Ten" },
];

const projectDetails: ProjectDetails[] = [
   {
     image: "/pexels-iamiliaafsharpoor-28961068.jpg",
     label: "Placeholder Details for Project One",
     subImages: [
       "/pexels-iamiliaafsharpoor-28961068.jpg",
       "/pexels-iamiliaafsharpoor-28961068.jpg",
       "/pexels-iamiliaafsharpoor-28961068.jpg",
     ],
   },
   // Add or remove additional subImages for each project below.
   // Each project should have its own preview image collection.

    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Two",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Three",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Four",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Five",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Six",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Seven",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Eight",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Nine",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
    {
      image: "/pexels-iamiliaafsharpoor-28961068.jpg",
      label: "Placeholder Details for Project Ten",
      subImages: [
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
        "/pexels-iamiliaafsharpoor-28961068.jpg",
      ],
    },
];

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedSubIndex, setSelectedSubIndex] = useState(0);
    const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const showPrevious = () => {
        setTransitionDirection(-1);
        setIsAnimating(true);
        setActiveIndex((current) => (current - 1 + projectOptions.length) % projectOptions.length);
    };

    const showNext = () => {
        setTransitionDirection(1);
        setIsAnimating(true);
        setActiveIndex((current) => (current + 1) % projectOptions.length);
    };

    const handleSelect = (index: number) => {
        setSelectedIndex(index);
        setSelectedSubIndex(0);
    };

    const handleClosePreview = () => {
        setSelectedIndex(null);
        setSelectedSubIndex(0);
    };

    // Move backward through the selected project's sub-image set.
    const showPreviousSubImage = () => {
        if (selectedIndex === null) {
            return;
        }

        const currentSubImages = projectDetails[selectedIndex].subImages;
        setSelectedSubIndex((current) => (current - 1 + currentSubImages.length) % currentSubImages.length);
    };

    // Move forward through the selected project's sub-image set.
    const showNextSubImage = () => {
        if (selectedIndex === null) {
            return;
        }

        const currentSubImages = projectDetails[selectedIndex].subImages;
        setSelectedSubIndex((current) => (current + 1) % currentSubImages.length);
    };

    const getWrappedIndex = (index: number) => {
        return (index + projectOptions.length) % projectOptions.length;
    };

    const hasActivePreview = selectedIndex !== null;
    const previewCarouselHeight = hasActivePreview ? "h-40 sm:h-44" : "h-64 sm:h-72";
    const previewPanelPadding = hasActivePreview ? "px-3 py-3 sm:px-4 sm:py-4" : "px-4 py-6 sm:px-8 sm:py-8";
    const previewImageHeight = hasActivePreview ? "h-44 sm:h-56" : "h-72 sm:h-128";
    const previewPanelClasses = hasActivePreview
        ? "scale-[0.7] origin-top overflow-visible transition-all duration-300"
        : "scale-100 origin-top overflow-visible transition-all duration-300";
    const previewSectionClasses = hasActivePreview
        ? "max-h-none"
        : "max-h-none";
    const visibleIndices = [getWrappedIndex(activeIndex - 1), activeIndex, getWrappedIndex(activeIndex + 1)];

    useEffect(() => {
        if (!isAnimating) {
            return;
        }

        const frame = window.requestAnimationFrame(() => setIsAnimating(false));

        return () => window.cancelAnimationFrame(frame);
    }, [isAnimating]);

    return (
        <>
            <section id="projects" className="relative w-full min-h-[200vh] scroll-mt-0">
                <div className="sticky top-0 z-20 h-screen w-full">
                    <div className="relative h-full w-full overflow-hidden bg-slate-950/95 text-white">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_30%)] opacity-95" />
                        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-8 p-6 sm:p-10 lg:p-12">
                            {!hasActivePreview ? (
                                <div className="rounded-4xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl sm:p-10">
                                    <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                                        Projects Section
                                    </h1>
                                </div>
                            ) : null}

                            <div className={`relative -mt-6 overflow-visible rounded-[1.75rem] bg-slate-900/70 ${previewPanelPadding} shadow-2xl shadow-slate-950/25 backdrop-blur-xl lg:px-10 transition-all duration-300`} style={{ transformOrigin: "top center" }}>
                                <button
                                    type="button"
                                    aria-label="Show previous option"
                                    onClick={showPrevious}
                                    className="absolute left-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-2xl font-semibold text-slate-700 shadow-md transition hover:bg-white"
                                >
                                    &lt;
                                </button>

                                <div className={`relative w-full ${previewCarouselHeight} -mt-4`}>
                                    {visibleIndices.map((index, position) => {
                                        const option = projectOptions[index];
                                        const isCenter = position === 1;
                                        const offset = position - 1;
                                        const scale = isCenter ? 1 : 0.82;
                                        const opacity = isCenter ? 1 : 0.8;
                                        const zIndex = isCenter ? 20 : 10;
                                        const isIncoming = isAnimating && ((transitionDirection === 1 && position === 2) || (transitionDirection === -1 && position === 0));
                                        const leftPosition = isIncoming
                                            ? `calc(50% + ${transitionDirection * 120}%)`
                                            : `calc(50% + ${offset * 40}%)`;

                                        return (
                                            <button
                                                key={`${option.label}-${index}`}
                                                type="button"
                                                onClick={() => handleSelect(index)}
                                                className={`absolute left-1/2 top-1/2 overflow-hidden rounded-2xl border border-white/40 shadow-xl transition-[left,transform,opacity] duration-300 hover:brightness-90 ${selectedIndex === index ? "ring-2 ring-amber-400/70" : ""}`}
                                                style={{
                                                    left: leftPosition,
                                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                                    opacity,
                                                    zIndex,
                                                }}
                                            >
                                                <div className="relative aspect-video w-56 overflow-hidden rounded-2xl sm:w-72 lg:w-96">
                                                    <img
                                                        src={option.image}
                                                        alt={`Project ${option.label}`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    {isCenter ? (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-4 text-center text-white">
                                                            <span className="text-lg font-semibold">{option.label}</span>
                                                            <span className="mt-1 text-sm">{`Option ${index + 1}`}</span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    type="button"
                                    aria-label="Show next option"
                                    onClick={showNext}
                                    className="absolute right-3 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-2xl font-semibold text-slate-700 shadow-md transition hover:bg-white"
                                >
                                    &gt;
                                </button>
                            </div>

                            <div className={`space-y-4 text-center ${previewPanelClasses} ${previewSectionClasses} -mt-2`} style={{ transformOrigin: "top center" }}>
                                {!hasActivePreview ? (
                                    <p className="text-sm font-medium text-slate-300">
                                        Centered option: {projectOptions[activeIndex].label} of 10 options
                                    </p>
                                ) : null}

                                <div className="relative mx-auto max-w-4xl rounded-4xl border border-white/10 bg-slate-900/80 p-4 shadow-inner shadow-black/20 sm:p-6">
                                    {selectedIndex !== null ? (
                                        <div className="space-y-4">
                                            <button
                                                type="button"
                                                aria-label="Close sub-image preview"
                                                onClick={handleClosePreview}
                                                className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-200 transition hover:bg-slate-800"
                                            >
                                                ×
                                            </button>
                                            {/* Full-size duplicate preview container */}
                                            <div className="overflow-visible rounded-4xl bg-black/20">
                                                <div className="aspect-video w-full overflow-visible rounded-4xl bg-slate-800">
                                                    <img
                                                        src={projectDetails[selectedIndex].subImages[selectedSubIndex]}
                                                        alt={`Project preview ${selectedSubIndex + 1} of ${projectDetails[selectedIndex].subImages.length}`}
                                                        className="h-full w-full object-contain"
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-2 text-left text-sm text-slate-300 sm:px-4">
                                                <p className="font-semibold text-white">Full-size duplicate preview</p>
                                                <p>{projectDetails[selectedIndex].label} shows the currently selected sub-image below.</p>
                                            </div>

                                            {/* Bottom sub-image pager interface */}
                                            <div className="mt-4 flex items-center justify-between rounded-4xl border border-amber-200/20 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 shadow-inner shadow-black/20 sm:px-6">
                                                <button
                                                    type="button"
                                                    onClick={showPreviousSubImage}
                                                    className="rounded-full border border-amber-300/30 bg-amber-200/10 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/20"
                                                >
                                                    Back
                                                </button>

                                                <div className="text-center text-sm text-amber-100">
                                                    {selectedSubIndex + 1} of {projectDetails[selectedIndex].subImages.length}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={showNextSubImage}
                                                    className="rounded-full border border-amber-300/30 bg-amber-200/10 px-4 py-2 text-sm text-amber-100 transition hover:bg-amber-200/20"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-4xl border border-dashed border-white/20 bg-slate-950/70 p-6 text-slate-300">
                                            Select a project card above to reveal the full-size duplicate image container and sub-image controls.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-screen w-full bg-slate-950/90 px-6 py-10 text-white sm:px-8 lg:px-10">
                    <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center gap-8">
                        <div className="rounded-4xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-2xl">
                            <div className="space-y-6">
                                {selectedIndex !== null ? (
                                    <>
                                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                            Project Information
                                        </h2>
                                        <p className="text-lg leading-8 text-slate-200">
                                            {projectDetails[selectedIndex].label}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                            Select a project to see details
                                        </h2>
                                        <p className="text-lg leading-8 text-slate-200">
                                            Scroll down one more screen inside this tall projects section to reveal the information panel before Contact appears.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}