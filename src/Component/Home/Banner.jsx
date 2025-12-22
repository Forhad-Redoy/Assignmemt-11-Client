import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Smart Chef Matching",
    desc: "AI-powered system connects you with the best local chefs.",
    tag: "AI Engine",
  },
  {
    title: "Live Meal Flow",
    desc: "Meals prepared fresh and tracked in real time.",
    tag: "Realtime",
  },
  {
    title: "Trusted Home Kitchens",
    desc: "Verified chefs delivering homemade quality food.",
    tag: "Verified",
  },
];

const HeroBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-100 px-4 py-2 rounded-full"
          >
            🍳 Future of homemade food
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            A smarter way to enjoy
            <br />
            homemade meals
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-xl"
          >
            Chef Bazaar is a next-generation platform connecting food lovers
            with trusted home chefs using intelligent systems.
          </motion.p>
        </div>

        {/* Right Futuristic Carousel */}
        <div className="relative flex items-center justify-center">
          
          {/* Rotating Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full border border-orange-300/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-60 h-60 rounded-full border border-orange-400/30"
          />

          {/* Carousel Card */}
          <div className="relative z-10 w-full max-w-sm p-6 rounded-3xl backdrop-blur-xl bg-white/70 border border-orange-200 shadow-2xl overflow-hidden">
            
            {/* Neon Scan Line */}
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <span className="inline-block mb-3 px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
                  {slides[index].tag}
                </span>

                <h3 className="text-xl font-bold text-gray-900">
                  {slides[index].title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {slides[index].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition ${
                    i === index
                      ? "bg-orange-500"
                      : "bg-orange-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;
