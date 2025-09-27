"use client";
import { motion, easeOut } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function IntroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Image Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-purple-900/40"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={bannerVariants}
      >
        {/* Animated Heading with Gradient Text */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-300 mb-6"
          variants={contentVariants}
        >
          Bắt Đầu Hành Trình Với Tourizto
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto mb-10"
          variants={contentVariants}
        >
          Khám phá những điểm đến tuyệt vời với các tour du lịch được thiết kế riêng, mang đến trải nghiệm độc đáo và khó quên.
        </motion.p>

        {/* CTA Button with Icon */}
        <motion.div variants={contentVariants}>
          <a
            href="/explore"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            <Compass className="mr-2" size={20} />
            Khám Phá Ngay
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-10 text-white/20"
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Compass size={50} />
      </motion.div>
      <motion.div
        className="absolute top-10 right-10 text-white/20"
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, delay: 2 }}
      >
        <ArrowRight size={50} />
      </motion.div>
    </section>
  );
}