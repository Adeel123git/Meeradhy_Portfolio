import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on devices with a mouse/pointer
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovered = false;
    let isClicking = false;
    let isVisible = false;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }

      // Check if target is interactive
      const target = e.target;
      if (target) {
        const isInteractive = Boolean(
          target.closest?.(
            "a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])"
          )
        );
        isHovered = isInteractive;
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Smooth animation loop for the trailing ring
    const render = () => {
      // Lerp for smooth lag effect
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      // Position inner dot instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Scale ring based on hover / click
      const scale = isClicking ? 0.75 : isHovered ? 1.55 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

      if (isHovered) {
        ring.style.borderColor = "#a855f7";
        ring.style.boxShadow =
          "0 0 20px rgba(168, 85, 247, 0.8), 0 0 35px rgba(103, 232, 249, 0.6), inset 0 0 10px rgba(103, 232, 249, 0.4)";
      } else {
        ring.style.borderColor = "rgba(103, 232, 249, 0.85)";
        ring.style.boxShadow =
          "0 0 16px rgba(103, 232, 249, 0.6), 0 0 25px rgba(168, 85, 247, 0.4), inset 0 0 6px rgba(168, 85, 247, 0.2)";
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Outer gradient trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none transition-opacity duration-200"
        style={{
          opacity: 0,
          border: "2px solid rgba(103, 232, 249, 0.85)",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, rgba(103, 232, 249, 0.05) 70%, transparent 100%)",
          boxShadow: "0 0 16px rgba(103, 232, 249, 0.6), 0 0 25px rgba(168, 85, 247, 0.4)",
          willChange: "transform",
        }}
      />
      {/* Inner precision glowing dot matching scrollbar cyan/purple */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none transition-opacity duration-200"
        style={{
          opacity: 0,
          background: "linear-gradient(135deg, #67e8f9 0%, #a855f7 100%)",
          boxShadow: "0 0 10px #67e8f9, 0 0 18px #a855f7",
          willChange: "transform",
        }}
      />
    </div>
  );
}