"use client";

import { motion, easeOut, Transition } from "framer-motion"; // Import Transition type
import Image from "next/image";
import { Users, MapPin, Award, Calendar, ArrowRight } from "lucide-react";
import { JSX } from "react";

// Định nghĩa interface cho dữ liệu value
interface ValueItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

// Định nghĩa interface cho dữ liệu stat
interface StatItem {
  value: string;
  label: string;
}

// Variants cho animation với transition type hợp lệ
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: easeOut } as Transition, // Explicitly cast to Transition
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut } as Transition, // Explicitly cast to Transition
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut } as Transition, // Explicitly cast to Transition
  },
};

export default function AboutSection() {
  const values: ValueItem[] = [
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      title: "Chất Lượng Hàng Đầu",
      description: "Mọi tour đều được thiết kế kỹ lưỡng để đảm bảo trải nghiệm tốt nhất.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Khách Hàng Là Trung Tâm",
      description: "Hỗ trợ 24/7 và dịch vụ cá nhân hóa cho mọi khách hàng.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Đa Dạng Điểm Đến",
      description: "Hơn 500 điểm đến trong và ngoài nước để bạn lựa chọn.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-orange-600" />,
      title: "Linh Hoạt & Tiện Lợi",
      description: "Đặt tour dễ dàng, thay đổi lịch trình linh hoạt.",
    },
  ];

  const stats: StatItem[] = [
    { value: "50K+", label: "Khách Hàng Hài Lòng" },
    { value: "500+", label: "Điểm Đến Toàn Cầu" },
    { value: "10K+", label: "Đánh Giá 5 Sao" },
    { value: "5+", label: "Năm Kinh Nghiệm" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h1
          variants={contentVariants}
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight"
        >
          Về <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Tourizto</span>
        </motion.h1>
        <motion.p
          variants={contentVariants}
          className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Tourizto là nền tảng đặt tour du lịch trực tuyến hàng đầu, mang đến trải nghiệm khám phá thế giới dễ dàng, an toàn và đáng nhớ.
        </motion.p>
      </motion.div>

      {/* Image + Mission Section */}
      <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
        <motion.div
          className="relative w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut } as Transition} // Cast transition
        >
          <Image
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80"
            alt="Tourizto Mission"
            width={600}
            height={450}
            className="object-cover w-full h-[400px] lg:h-[500px] rounded-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>

        <motion.div
          className="flex-1 text-center lg:text-left"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={contentVariants}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Sứ Mệnh Của Chúng Tôi
          </motion.h2>
          <motion.p
            variants={contentVariants}
            className="text-gray-600 text-lg max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed"
          >
            Chúng tôi tin rằng du lịch không chỉ là hành trình đến một điểm đến mới, mà còn là cơ hội để kết nối, khám phá và tạo nên những kỷ niệm đáng trân trọng. Tourizto cam kết mang đến những tour du lịch chất lượng, giá cả hợp lý và dịch vụ tận tâm.
          </motion.p>
          <motion.a
            variants={contentVariants}
            href="/booking"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Khám Phá Tour Ngay
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
            <p className="text-gray-600 text-sm">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="mt-20 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={contentVariants}
          className="text-3xl font-bold text-gray-900 mb-8"
        >
          Tourizto Qua Những Con Số
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={contentVariants}
              className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl"
            >
              <p className="text-3xl font-bold text-indigo-600">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}