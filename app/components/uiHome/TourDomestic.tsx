"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TourCard from "../ui/TourCard";
import { Tour } from "@/app/types/Tours";

const TourDomestic = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch(
        "http://localhost:5000/api/tours/fixed-category/du-lich-trong-nuoc"
      );
      const data = await res.json();
      setTours(data.data || []);
    };
    fetchTours();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900"
        >
          Khám Phá Tour Trong Nước
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-lg text-gray-600"
        >
          Những hành trình tuyệt vời từ Bắc vào Nam, mang đến cho bạn trải nghiệm
          độc đáo và đáng nhớ.
        </motion.p>
        <div className="mt-6 flex justify-center">
          <span className="w-32 h-1 bg-blue-500 rounded-full"></span>
        </div>
      </div>

      {/* Grid Tours */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        {tours.map((tour, index) => (
          <motion.div
            key={tour.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
            className="hover:scale-105 transition-transform duration-300"
          >
            <TourCard tour={tour} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TourDomestic;
