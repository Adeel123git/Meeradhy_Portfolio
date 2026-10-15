import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// Importing project screenshot images
import img1 from "../assets/img1.JPG";
import img3 from "../assets/img3.JPG";
import img4 from "../assets/img4.png";

export default function Projects() {
  // Curated project configurations with matching background palettes
  const projects = React.useMemo(
    () => [
      {
        id: "01",
        title: "Gracious Garments",
        category: "Fashion E-Commerce",
        link: "https://g-garments.netlify.app/",
        domain: "gracious-garments.com",
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
        domain: "fitnessgym.com",
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
      <div className="sticky top-0 h-screen flex flex-col items-center justify-between py-4 sm:py-6 px-3 sm:px-6 max-w-6xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="text-center z-10 pt-1 sm:pt-2">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/90 mb-0.5 block">
            Featured Projects
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
            My Work
          </h2>
        </div>

        {/* Project Display Area */}
        <div className="relative w-full flex-1 flex items-center justify-center my-1 sm:my-3">
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
                {/* Unified Card & Button Column: physically impossible to overlap! */}
                <div className="w-full max-w-3xl lg:max-w-4xl flex flex-col items-center px-1">
                  {/* Project Info Header */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full flex items-center justify-between px-2 mb-1.5 sm:mb-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold bg-white/10 text-cyan-300 border border-white/15 backdrop-blur-md">
                            {project.id} / 03
                          </span>
                          <span className="text-[11px] sm:text-xs text-gray-300/80 font-medium hidden xs:inline">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl md:text-2xl font-extrabold tracking-wide text-white drop-shadow">
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
                    className="group relative w-full rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] border cursor-pointer"
                    style={{
                      backgroundColor: project.cardBg,
                      borderColor: project.browserBorder,
                      boxShadow: `0 20px 50px -15px rgba(0, 0, 0, 0.75), 0 0 30px ${project.accentGlow}`,
                    }}
                  >
                    {/* Browser Mockup Header Bar */}
                    <div
                      className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 border-b transition-colors duration-300"
                      style={{
                        backgroundColor: project.browserBarBg,
                        borderColor: project.browserBorder,
                      }}
                    >
                      {/* Window traffic light buttons */}
                      <div className="flex items-center space-x-1 sm:space-x-1.5">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                      </div>

                      {/* Mockup URL Pill */}
                      <div
                        className="flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-mono font-medium max-w-[170px] sm:max-w-sm truncate border"
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

                    {/* Seamless Image Canvas with exact aspect ratio */}
                    <div
                      className="relative w-full aspect-[1342/630] max-h-[35vh] sm:max-h-[46vh] flex items-center justify-center overflow-hidden"
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

                  {/* View Project Action Button - cleanly positioned below the card */}
                  <div className="mt-3 sm:mt-5 flex justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectOpen();
                      }}
                      className="group inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-semibold rounded-full bg-white text-gray-900 hover:bg-cyan-50 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-400/40"
                      aria-label={`View live project ${project.title}`}
                    >
                      <span>View Project</span>
                      <FaArrowUpRightFromSquare className="text-xs sm:text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-cyan-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small bottom indicator */}
        <div className="z-10 pb-1 text-center">
          <span className="text-[10px] sm:text-xs text-white/40 tracking-wider">
            Scroll down to explore
          </span>
        </div>
      </div>
    </section>
  );
}
