"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Category } from "@/app/types/Categories";
import { motion, easeOut } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

const overlayVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  hover: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const CategoriesImage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://travel-booking-backend-production.up.railway.app/api/categories/fixed");
        const result = await res.json();
        setCategories(result.data || []);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.section
      className="relative py-16 bg-gradient-to-b from-indigo-50/50 to-white/90"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1
          className="text-center mb-12 text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          Khám Phá Những Điểm Đến <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Hot Nhất
          </span>
        </motion.h1>
        {loading ? (
          <div className="text-center text-gray-600">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {categories.map((cate) => (
              <motion.div
                key={cate.id}
                className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg group cursor-pointer bg-white/95 backdrop-blur-lg"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={`${cate.image}`}
                  alt={cate.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 to-purple-900/50 flex flex-col items-center justify-center gap-4"
                  variants={overlayVariants}
                  initial="hidden"
                  whileHover="hover"
                >
                  <h3 className="text-white text-xl font-semibold tracking-tight flex items-center gap-2">
                    <MapPin size={20} />
                    {cate.name}
                  </h3>
                  <a
                    href={`/categories/${cate.slug}`}
                    className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Khám Phá
                    <ArrowRight className="ml-2" size={18} />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Decorative Floating Element */}
      <motion.div
        className="absolute top-10 right-10 text-indigo-600/30 hidden lg:block"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <MapPin size={40} />
      </motion.div>
    </motion.section>
  );
};

export default CategoriesImage;