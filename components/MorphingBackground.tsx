"use client";

import { useEffect, useRef, useState } from "react";

// Single gradient entry used for the animated floating blobs.
type GradientBlob = {
  id: string;
  color: string;
  size: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

// Helper to generate a random number between min and max.
const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

// Helper to clamp a value between a minimum and maximum.
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// Generate the five floating gradients with varying colors, sizes, and velocities.
const generateInitialBlobs = (): GradientBlob[] => {
  const colors = [
    "rgba(79,70,229,0.28)", // indigo
    "rgba(16,185,129,0.24)", // emerald
    "rgba(236,72,153,0.28)", // pink
    "rgba(59,130,246,0.20)", // blue
    "rgba(245,158,11,0.26)", // amber
  ];

  return colors.map((color, index) => {
    const size = randomBetween(30, 65);
    const offset = size / 2;

    return {
      id: `blob-${index}`,
      color,
      size,
      x: randomBetween(offset, 100 - offset),
      y: randomBetween(offset, 100 - offset),
      speedX: randomBetween(5, 12) * (Math.random() > 0.5 ? 1 : -1),
      speedY: randomBetween(4, 10) * (Math.random() > 0.5 ? 1 : -1),
      opacity: randomBetween(0.5, 0.8),
    };
  });
};

export default function MorphingBackground() {
  // Store the blob definitions in state after mount so the initial randomization only runs once.
  const [initialBlobs, setInitialBlobs] = useState<GradientBlob[]>([]);

  useEffect(() => {
    const blobs = generateInitialBlobs();
    setInitialBlobs(blobs);
    blobStateRef.current = blobs;
  }, []);

  // Refs to update DOM nodes directly for smoother animation.
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const blobStateRef = useRef<GradientBlob[]>(initialBlobs);
  const cursorStateRef = useRef({ x: 50, y: 50, targetX: 50, targetY: 50 });

  useEffect(() => {
    // Update blob positions and cursor position each animation frame.
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaSeconds = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      blobStateRef.current = blobStateRef.current.map((blob) => {
        const min = blob.size / 2;
        const max = 100 - blob.size / 2;

        let nextX = blob.x + blob.speedX * deltaSeconds;
        let nextY = blob.y + blob.speedY * deltaSeconds;
        let speedX = blob.speedX;
        let speedY = blob.speedY;

        // Keep the gradient at least halfway on screen by bouncing off the clipped bounds.
        if (nextX <= min || nextX >= max) {
          speedX = -speedX;
          nextX = clamp(nextX, min, max);
        }

        if (nextY <= min || nextY >= max) {
          speedY = -speedY;
          nextY = clamp(nextY, min, max);
        }

        return {
          ...blob,
          x: nextX,
          y: nextY,
          speedX,
          speedY,
        };
      });

      blobStateRef.current.forEach((blob, index) => {
        const blobElement = blobRefs.current[index];
        if (!blobElement) {
          return;
        }

        blobElement.style.left = `${blob.x}%`;
        blobElement.style.top = `${blob.y}%`;
      });

      // Ease the cursor-following gradient to its target location.
      const cursor = cursorStateRef.current;
      cursor.x += (cursor.targetX - cursor.x) * 0.12;
      cursor.y += (cursor.targetY - cursor.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursor.x}%`;
        cursorRef.current.style.top = `${cursor.y}%`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle pointer move and mobile touch events so the amber gradient follows the user's touch or cursor.
    const updatePointer = (clientX: number, clientY: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const clampedX = clamp((clientX / width) * 100, 20, 80);
      const clampedY = clamp((clientY / height) * 100, 20, 80);
      cursorStateRef.current.targetX = clampedX;
      cursorStateRef.current.targetY = clampedY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        return;
      }
      updatePointer(event.touches[0].clientX, event.touches[0].clientY);
    };

    const handlePointerLeave = () => {
      cursorStateRef.current.targetX = 50;
      cursorStateRef.current.targetY = 50;
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handlePointerLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handlePointerLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base dark layer to preserve the page background and emphasize the glow. */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Second blurred overlay layer for extra ambient depth and soft light. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 20% 18%, rgba(79,70,229,0.28) 0%, transparent 28%), radial-gradient(circle at 82% 34%, rgba(16,185,129,0.24) 0%, transparent 26%), radial-gradient(circle at 52% 82%, rgba(245,158,11,0.28) 0%, transparent 28%)",
          filter: "blur(52px)",
          opacity: 0.94,
          mixBlendMode: "screen",
        }}
      />

      {/* Floating gradients container with blur and blend mode applied. */}
      <div className="absolute inset-0 overflow-hidden" style={{ filter: "blur(85px)" }}>
        {initialBlobs.map((blob, index) => (
          <div
            key={blob.id}
            ref={(element) => {
              blobRefs.current[index] = element;
            }}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: `${blob.size}%`,
              height: `${blob.size}%`,
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              opacity: blob.opacity,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle at center, ${blob.color} 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0.0) 65%)`,
              mixBlendMode: "screen",
            }}
          />
        ))}

        {/* Cursor-following amber gradient. */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: "42%",
            height: "42%",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle at center, rgba(254,243,199,0.98) 0%, rgba(254,243,199,0.02) 40%)",
            opacity: 0.82,
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}
