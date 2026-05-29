import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// ✅ Reusable Tilt Component
const Tilt = ({ children, className }) => {
  return (
    <div
      className={`${className} transform transition-transform duration-500 hover:scale-[1.03]`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
};

// ✅ Simple Typing Effect Component (no external lib)
const TypingEffect = ({ text, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

const About = () => {
  return (
    <div className="bg-gray-900 text-white overflow-hidden">
      {/* Spacer for navbar */}
      <div className="pt-24" />

      {/* --- 1. INTRO SECTION --- */}
      <section className="relative py-20 sm:py-28 text-center overflow-hidden">
        {/* Pattern Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="gymPatternIntro" width="120" height="120" patternUnits="userSpaceOnUse">
              {/* Dumbbell Icon */}
              <g fill="white">
                <rect x="10" y="50" width="20" height="10" rx="2"></rect>
                <rect x="90" y="50" width="20" height="10" rx="2"></rect>
                <rect x="30" y="55" width="60" height="2"></rect>
              </g>
              {/* Kettlebell Icon */}
              <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none"></circle>
              <rect x="50" y="20" width="20" height="25" rx="6" fill="white"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gymPatternIntro)" />
        </svg>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/80"></div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase"
          >
            <span
              className="text-transparent bg-clip-text 
                   bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 
                   animate-pulse"
            >
              More Than Just a Gym
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg md:text-xl mt-6 text-gray-200"
          >
            At <span className="font-semibold shimmer">NoLimit</span>, we believe that fitness is a journey, not a destination.
            We're a passionate community dedicated to pushing boundaries, breaking limits,
            and forging the strongest version of ourselves—together.
          </motion.p>
        </div>
      </section>

      {/* --- 2. OUR STORY SECTION --- */}
<section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black">
  <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
    {/* Left Image */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <Tilt>
        <img
          src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2787&auto=format&fit=crop"
          alt="Personal training session"
          className="rounded-2xl shadow-2xl object-cover w-full h-full border-4 border-orange-500/40"
        />
      </Tilt>
    </motion.div>

    {/* Right Text */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="text-center md:text-left"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight uppercase mb-6">
        Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 animate-pulse">
          Story
        </span>
      </h2>

      {/* Typing Effect */}
      <p className="text-gray-300 text-lg leading-relaxed font-medium mb-4">
        <TypingEffect
          text="Founded in 2020 by passionate fitness veterans, NoLimit was created to empower everyone to achieve their goals."
          speed={50}
        />
      </p>

      <p className="text-gray-300 text-lg leading-relaxed font-medium">
        <TypingEffect
          text="With top equipment, dedicated trainers, and a supportive environment, we invite you to join our journey to greatness."
          speed={50}
        />
      </p>
    </motion.div>
  </div>

  {/* Overlay for depth */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>
</section>
{/* --- 3. OUR VALUES SECTION --- */}
<section className="py-20 sm:py-28 relative overflow-hidden bg-gray-900 text-white">
  {/* Pattern Background */}
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <pattern id="gymPatternValues" width="120" height="120" patternUnits="userSpaceOnUse">
        {/* Dumbbell Icon */}
        <g fill="white">
          <rect x="10" y="50" width="20" height="10" rx="2"></rect>
          <rect x="90" y="50" width="20" height="10" rx="2"></rect>
          <rect x="30" y="55" width="60" height="2"></rect>
        </g>
        {/* Kettlebell Icon */}
        <circle cx="60" cy="20" r="15" stroke="white" strokeWidth="4" fill="none"></circle>
        <rect x="50" y="20" width="20" height="25" rx="6" fill="white"></rect>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gymPatternValues)" />
  </svg>

  {/* Dark overlay for contrast */}
  <div className="absolute inset-0 bg-gray-900/80"></div>

  <div className="container mx-auto px-6 relative z-10 text-center">
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-6xl font-extrabold tracking-tight uppercase mb-16"
    >
      What We <span className="text-orange-500">Stand For</span>
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        {
          title: "Strength & Dedication",
          text: "We champion the commitment required to achieve greatness, providing the tools and support for your journey.",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          ),
        },
        {
          title: "Community First",
          text: "We are a diverse family united by a common goal. We support, motivate, and celebrate each other's successes.",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"
            />
          ),
        },
        {
          title: "Continuous Improvement",
          text: "We believe in constant evolution—of our members, our trainers, and our facility. We never settle for good enough.",
          icon: (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19V9a2 2 0 012-2h2a2 2 0 012 2v10"
            />
          ),
        },
      ].map((val, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.2 }}
        >
          <Tilt className="relative bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500 transition-colors duration-300 shadow-lg flex flex-col items-center group">
            
           
            {/* Spinning SVG Icon */}
            <svg
              className="w-16 h-16 text-orange-500 mb-4 group-hover:animate-spin-fast"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {val.icon}
            </svg>

            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">{val.title}</h3>
            <p className="text-gray-300 text-lg font-medium">{val.text}</p>
          </Tilt>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* --- 4. MEET THE TEAM SECTION --- */}
<section className="py-20 sm:py-28 bg-gradient-to-r from-gray-900 via-gray-800 to-black relative overflow-hidden">
  <div className="container mx-auto px-6 text-center relative z-10">
    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl font-extrabold tracking-tight uppercase mb-6"
    >
      Meet Our{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 animate-pulse">
        Elite Trainers
      </span>
    </motion.h2>

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="max-w-3xl mx-auto text-lg text-gray-300 font-semibold leading-relaxed mb-16"
    >
      <span className="text-orange-400 font-bold">Certified. Experienced. Passionate.</span>{" "}
      Our trainers are the best in the business—dedicated to helping you unlock your full potential.
    </motion.p>

    {/* Trainers Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
  {[
    {
      name: "Jane Doe",
      role: "Head of Strength Training",
      img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "John Smith",
      role: "Cardio & Endurance Expert",
      img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2940&auto=format&fit=crop",
    },
    {
      name: "Emily White",
      role: "Nutrition & Wellness Coach",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=60",
    },
  ].map((trainer, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: i * 0.2 }}
    >
      <Tilt className="bg-gray-900 rounded-2xl overflow-hidden 
                        border border-orange-500/30 
                        shadow-2xl transition duration-300
                        hover:shadow-[0_0_25px_5px_rgba(255,215,0,0.6)] 
                        hover:border-orange-400">
        <img
          src={trainer.img}
          alt={trainer.name}
          className="w-full h-80 object-cover"
        />
        <div className="p-6 bg-gradient-to-t from-black/70 via-gray-900/80 to-transparent">
          <h3 className="text-2xl font-extrabold text-white tracking-wide">
            {trainer.name}
          </h3>
          <p className="text-orange-400 font-semibold mt-1">
            {trainer.role}
          </p>
        </div>
      </Tilt>
    </motion.div>
  ))}
</div>

    {/* Call to Action with Hover Shimmer */}
    <div className="flex justify-center mt-16">
      <motion.a
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        href="/select-workout"
        className="group relative inline-block font-bold py-3 px-10 rounded-xl text-lg shadow-lg 
                   bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 
                   text-white transition-all duration-300 hover:scale-105 overflow-hidden"
      >
        {/* Button Text */}
        <span className="relative z-10">Explore All Trainers & Specialties</span>

        {/* Shimmer Overlay (only on hover) */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent 
                     -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out
                     mix-blend-lighten pointer-events-none"
        ></span>
      </motion.a>
    </div>
  </div>

  {/* Overlay Gradient for Depth */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70"></div>
</section>

       </div>
  );
};

export default About;
