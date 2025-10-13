"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function IntroSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
      {/* LEFT: Image */}
      <motion.div
        className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
          alt="Beach Kid"
          width={600}
          height={450}
          className="object-cover w-full h-[400px] lg:h-[500px] rounded-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </motion.div>

      {/* RIGHT: Content */}
      <motion.div
        className="flex-1 text-center lg:text-left"
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          variants={contentVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
        >
          GIẢI PHÓNG <br />
          Niềm đam mê du lịch cùng <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Tourizto
          </span>
        </motion.h1>

        <motion.p
          variants={contentVariants}
          className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
        >
          Du lịch là cách tuyệt vời để khám phá những vùng đất mới, trải nghiệm văn hóa độc đáo và tạo nên những kỷ niệm khó quên.
        </motion.p>

        {/* Offer + Button Row */}
        <motion.div
          variants={contentVariants}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
        >
          {/* Offer box */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-indigo-100 rounded-xl px-6 py-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <p className="text-indigo-700 font-bold text-2xl">GIẢM GIÁ 20%</p>
            <p className="text-gray-500 text-sm">Hết hạn: 30/10/2025</p>
          </div>

          {/* CTA Button */}
          <a
            href="#"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Đặt ngay
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}