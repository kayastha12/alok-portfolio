"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Track hovered elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  useEffect(() => {
    // Lerp trailPosition towards position
    let animationFrameId: number;
    
    const updateTrail = () => {
      setTrailPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Adjust speed here (0.15 is smooth)
        return {
          x: prev.x + dx * 0.15,
          y: prev.y + dy * 0.15,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };
    
    animationFrameId = requestAnimationFrame(updateTrail);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [position]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#245D66] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out hidden md:block"
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0) scale(${
            clicked ? 0.8 : linkHovered ? 1.5 : 1
          })`,
          opacity: linkHovered ? 0.8 : 0.4,
          backgroundColor: linkHovered ? "rgba(36, 93, 102, 0.05)" : "transparent",
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#245D66] rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          opacity: 0.9,
        }}
      />
    </>
  );
}
