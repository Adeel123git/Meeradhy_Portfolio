import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// Importing project screenshot images
import img1 from "../assets/img1.JPG";
import img3 from "../assets/img3.JPG";
import img4 from "../assets/img4.png";

// Custom hook to detect mobile screen size
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) ||
      mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();

  // Curated project configurations with matching background palettes
  const projects = React.useMemo(
    () => [
      {
        id: "01",
        title: "Gracious Garments",
        category: "Fashion E-Commerce",
        link: "https://g-garments.netlify.app/",
        domain: "g-garments.netlify.app",
        // Deep emerald atmospheric section background
        sectionBg:
          "radial-gradient(circle at 50% 45%, #0f4637 0%, #092e24 55%, #03140f 100%)",
        // Exact cream match to the website hero screenshot
        cardBg: "#FAF4E8",
        browserBarBg: "#EDE3D4",
        browserBorder: "#DFD2BF",
        browserTextColor: "#5c5040",
        accentGlow: "rgba(43, 162, 106, 0.4)",
        image: img1,
      },
      {
        id: "02",
        title: "Tourist Shoes",
        category: "Footwear Brand & Store",
        link: "https://www.touristshoes.pk/",
        domain: "touristshoes.pk",
        // Midnight navy atmospheric section background
        sectionBg:
          "radial-gradient(circle at 50% 45%, #182844 0%, #0f182c 55%, #050a14 100%)",
        // Exact pure white match to the website hero screenshot
        cardBg: "#FFFFFF",
        browserBarBg: "#F1F5F9",
        browserBorder: "#E2E8F0",
        browserTextColor: "#475569",
        accentGlow: "rgba(59, 130, 246, 0.4)",
        image: img4,
      },
      {
        id: "03",
        title: "FitnessGym",
        category: "Gym & Fitness Club",
        link: "https://meeradhy-fitnessgym.netlify.app/",
        domain: "meeradhy-fitnessgym.netlify.app",
        // Crimson-tinted black atmospheric section background
        sectionBg:
          "radial-gradient(circle at 50% 45%, #2a0b0b 0%, #150303 55%, #000000 100%)",
        // Exact deep pitch black match to the website screenshot
        cardBg: "#050505",
        browserBarBg: "#161616",
        browserBorder: "#2a2a2a",
        browserTextColor: "#9ca3af",
        accentGlow: "rgba(239, 68, 68, 0.45)",
        image: img3,
      },
    ],
    []
  );

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  const handleProjectOpen = () => {
    if (!activeProject?.link) return;
    window.open(activeProject.link, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white select-none"
      style={{
        height: `${100 * projects.length}vh`,
        background: activeProject.sectionBg,
        transition: "background 500ms ease",
      }}
    >
      {/* Ambient decorative glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${activeProject.accentGlow} 0%, transparent 60%)`,
        }}
      />

      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen flex flex-col justify-between items-center py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="text-center z-10 pt-2 sm:pt-4">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400/90 mb-1 block">
            Featured Projects
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
            My Work
          </h2>
        </div>

        {/* Project Card Area */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-4">
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={project.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "opacity-100 z-20 pointer-events-auto scale-100"
                    : "opacity-0 z-0 pointer-events-none scale-95"
                }`}
              >
                <div className="w-full max-w-4xl flex flex-col items-center">
                  {/* Project Info Header */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full flex items-center justify-between px-2 sm:px-3 mb-2 sm:mb-3"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-white/10 text-cyan-300 border border-white/15 backdrop-blur-md">
                            {project.id} / 03
                          </span>
                          <span className="text-xs sm:text-sm text-gray-300/80 font-medium hidden xs:inline">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-wide text-white drop-shadow">
                          {project.title}
                        </h3>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Browser Mockup Card Container */}
                  <div
                    onClick={handleProjectOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleProjectOpen();
                      }
                    }}
                    className="group relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border cursor-pointer"
                    style={{
                      backgroundColor: project.cardBg,
                      borderColor: project.browserBorder,
                      boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.75), 0 0 35px ${project.accentGlow}`,
                    }}
                  >
                    {/* Browser Mockup Header Bar */}
                    <div
                      className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b transition-colors duration-300"
                      style={{
                        backgroundColor: project.browserBarBg,
                        borderColor: project.browserBorder,
                      }}
                    >
                      {/* Window traffic light buttons */}
                      <div className="flex items-center space-x-1.5 sm:space-x-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                      </div>

                      {/* Mockup URL Pill */}
                      <div
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] sm:text-xs font-mono font-medium max-w-[200px] sm:max-w-sm truncate border"
                        style={{
                          backgroundColor: project.cardBg,
                          borderColor: project.browserBorder,
                          color: project.browserTextColor,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{project.domain}</span>
                      </div>

                      {/* Subtle hover prompt icon */}
                      <div
                        className="text-xs font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ color: project.browserTextColor }}
                      >
                        <span className="hidden md:inline text-[11px]">Open</span>
                        <FaArrowUpRightFromSquare className="text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                    {/* Seamless Image Canvas */}
                    <div
                      className="relative w-full aspect-[1342/630] max-h-[46vh] sm:max-h-[50vh] flex items-center justify-center overflow-hidden"
                      style={{ backgroundColor: project.cardBg }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain block select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Project Action Button */}
        <div className="z-10 mt-4 sm:mt-6 pb-4 sm:pb-6 flex flex-col items-center">
          <button
            type="button"
            onClick={handleProjectOpen}
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full bg-white text-gray-900 hover:bg-cyan-50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
            aria-label={`View project ${activeProject?.title}`}
          >
            <span>View Project</span>
            <FaArrowUpRightFromSquare className="text-xs sm:text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
