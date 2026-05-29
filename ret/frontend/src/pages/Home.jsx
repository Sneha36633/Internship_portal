import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- Custom Tilt Component (No changes needed here) ---
const Tilt = ({ children, className, onEnter, onLeave, transitionSpeed = 400 }) => {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;

    const { width, height, left, top } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const maxTilt = 10;
    const scale = 1.05;

    const tiltX = (y / height - 0.5) * -maxTilt;
    const tiltY = (x / width - 0.5) * maxTilt;

    el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;
    el.style.transition = "none";
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = `transform ${transitionSpeed / 1000}s ease`;
    if (onLeave) onLeave();
  };

  const handleMouseEnter = () => {
    if (onEnter) onEnter();
  };

  return (
    <div
      ref={tiltRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

// Mock Link (replace with react-router-dom Link if you have it)
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const InternshipHome = () => {
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  // These parallax effects on scroll are great, let's keep them
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-100, 0]);
  const middleY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <div className="bg-gray-900">
      {/* --- HERO SECTION --- */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center p-4 md:p-8 overflow-hidden"
        style={{
          // New background image relevant to careers/internships
          backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll", // mobile-safe
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80"></div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <Tilt
            onEnter={() => setHovered(true)}
            onLeave={() => setHovered(false)}
            transitionSpeed={400}
            className="relative z-10 bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-white/10 max-w-5xl mx-auto shadow-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-white drop-shadow-md">
                Launch Your
                <br />
                {/* Updated color scheme to a professional blue/cyan */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 animate-pulse">
                  Future Career
                </span>
              </h1>

              <motion.p
                className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 drop-shadow-sm transition-all duration-500 ${
                  hovered ? "text-cyan-300 drop-shadow-[0_0_15px]" : ""
                }`}
              >
                Connect with top companies, gain real-world experience, and build the foundation for your professional life.
              </motion.p>
            </motion.div>
          </Tilt>
        </motion.div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="relative text-white py-16 sm:py-24 overflow-hidden">
        {/* New SVG background pattern for internship theme */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="portalPattern" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Briefcase Icon */}
                <path d="M45 45 h60 v10 h-60 z" stroke="white" strokeWidth="2" fill="none" />
                <path d="M40 55 h70 v30 h-70 z" stroke="white" strokeWidth="2" fill="none" />
                <path d="M70 45 v-5 a5 5 0 0 1 10 0 v5" stroke="white" strokeWidth="2" fill="none" />
                {/* Graduation Cap Icon */}
                <path d="M120 120 l30 -10 l30 10 l-30 10 z" stroke="white" strokeWidth="2" fill="none" />
                <path d="M150 120 v20" stroke="white" strokeWidth="2" fill="none" />
                <path d="M175 130 h5 v5 h-5 z" stroke="white" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#portalPattern)" />
        </svg>

        <div className="absolute inset-0 bg-gray-900/85"></div>

        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-4"
          >
            Why <span className="text-blue-500">Choose Us</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 mb-12 md:mb-16"
          >
            We are more than just a job board. We are your dedicated partner in career development, connecting talent with opportunity.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* --- Feature 1 --- */}
            <motion.div style={{ x: leftX }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-2">Curated Listings</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Access exclusive internship opportunities from verified companies, ranging from startups to Fortune 500s.
                </p>
              </Tilt>
            </motion.div>

            {/* --- Feature 2 --- */}
            <motion.div style={{ y: middleY }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-2">Seamless Applications</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Apply to multiple internships with a single, polished profile. Track your application status in one place.
                </p>
              </Tilt>
            </motion.div>

            {/* --- Feature 3 --- */}
            <motion.div style={{ x: rightX }}>
              <Tilt className="bg-gray-800 p-8 rounded-lg border border-gray-700 shadow-lg hover:border-blue-500 transition-colors duration-300 h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-2">Career Resources</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  Utilize our resume builder, interview prep guides, and skill-building workshops to land your dream role.
                </p>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative bg-gradient-to-r from-blue-700 to-cyan-500 text-white py-16 sm:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-center"
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">Start Your Journey?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
          >
            Create your profile today and take the first step towards a successful and fulfilling career.
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <Link
              to="/register" // Changed link to /register for new users
              className="relative group overflow-hidden bg-white text-blue-600 font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-lg text-base sm:text-lg shadow-md
                         hover:shadow-xl hover:scale-105 transform transition-all duration-300 inline-block"
            >
              🚀 Get Started Now
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent 
                               -translate-x-full rotate-45 group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
            </Link>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent)] animate-pulse" />
      </section>
    </div>
  );
};

export default InternshipHome;
