"use client";

import { motion, easeOut } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, MapPin, Calendar, Award } from "lucide-react";

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

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
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
          alt="Tourizto - Booking Tour"
          width={600}
          height={450}
          className="object-cover w-full h-[400px] lg:h-[500px] rounded-2xl"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Floating badges */}
        <div className="absolute top-6 left-6 flex gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-indigo-600 shadow-lg">
            #1 Tour Booking
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-green-600 shadow-lg">
            50K+ Users
          </div>
        </div>
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
          Khám Phá <br />
          Thế Giới Cùng <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Tourizto
          </span>
        </motion.h1>

        <motion.p
          variants={contentVariants}
          className="text-gray-600 text-lg sm:text-xl max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed"
        >
          Nền tảng đặt tour du lịch trực tuyến hàng đầu Việt Nam. 
          Hàng ngàn tour trong và ngoài nước, giá tốt nhất, 
          dịch vụ chuyên nghiệp 24/7.
        </motion.p>

        {/* Features */}
        <motion.div
          variants={contentVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0"
        >
          <motion.div
            variants={iconVariants}
            className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
          >
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Giá tốt nhất</span>
          </motion.div>
          <motion.div
            variants={iconVariants}
            className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
          >
            <Users className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">10K+ đánh giá</span>
          </motion.div>
          <motion.div
            variants={iconVariants}
            className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
          >
            <MapPin className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">500+ điểm đến</span>
          </motion.div>
          <motion.div
            variants={iconVariants}
            className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
          >
            <Calendar className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-700">Đặt linh hoạt</span>
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={contentVariants}
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
        >
          {/* CTA Button */}
          <a
            href="/explore"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Bắt Đầu Đặt Tour
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>

          {/* Learn More Button */}
          <a
            href="/about"
            className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300"
          >
            Tìm Hiểu Thêm
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          variants={contentVariants}
          className="flex items-center justify-center lg:justify-start gap-6 mt-6"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 bg-green-500 rounded-full" />
            Thanh toán an toàn
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 bg-blue-500 rounded-full" />
            Hỗ trợ 24/7
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}