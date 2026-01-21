import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // GSAP ki madad se movement ko smooth banana
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveHandler = (e) => {
      // Mouse position ke hisaab se cursor ko move karna
      // -40 isliye taaki 80px ka circle center mein rahe
      xTo(e.clientX - 40);
      yTo(e.clientY - 40);
    };

    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
    >
      {/* Glowing Circle with Pulse Animation */}
      <div
        className="w-20 h-20 rounded-full 
                   bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
                   blur-2xl opacity-70 animate-pulse"
        style={{
          boxShadow: "0 0 50px rgba(236, 72, 153, 0.5)",
        }}
      />
    </div>
  );
}