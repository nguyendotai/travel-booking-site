"use client";
import TourSearchForm from "./TourSearchForm";
import { motion, easeOut } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function Banner() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden mt-16 lg:mt-0">
      {/* Parallax Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bea21b4ccc54d80679542e44ce849f57.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/60 to-transparent"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={bannerVariants}
      >
        {/* Text and CTA Section */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
            variants={contentVariants}
          >
            Hành Trình Mới <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-400">
              Bắt Đầu Với Tourizto
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-gray-100/90 max-w-md mx-auto lg:mx-0"
            variants={contentVariants}
          >
            Khám phá những điểm đến tuyệt vời với các tour du lịch được thiết kế
            riêng, mang đến trải nghiệm khó quên.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center lg:justify-start"
            variants={contentVariants}
          >
            <a
              href="/explore"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Khám Phá Ngay
              <ArrowRight className="ml-2" size={20} />
            </a>
          </motion.div>
        </div>

        {/* Search Form with Card Effect */}
        <motion.div
          className="flex-1 w-full max-w-lg bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
          variants={contentVariants}
        >
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              Tìm Tour Của Bạn
            </h2>
          </div>
          <TourSearchForm />
        </motion.div>
      </motion.div>

      {/* Decorative Floating Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
      <motion.div
        className="absolute top-10 right-10 text-white/30"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <MapPin size={40} />
      </motion.div>
    </section>
  );
}
