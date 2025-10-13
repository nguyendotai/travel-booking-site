"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TourCard from "../ui/TourCard";
import { Tour } from "@/app/types/Tours";
import { useRouter } from "next/navigation";

const TourInternational = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/tours/fixed-category/du-lich-quoc-te"
        );
        const data = await res.json();
        const ongoingTours = (data.data || []).filter(
          (tour: Tour) => tour.tourStatus === "ongoing"
        );

        // Chỉ lấy 3 tour đầu tiên
        setTours(ongoingTours.slice(0, 3));
      } catch (error) {
        console.error("Lỗi khi tải tour quốc tế:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-pink-50 via-white to-pink-50 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-gray-900"
        >
          Khám Phá Tour Quốc Tế
        </motion.h2>

        <div className="mt-6 flex justify-center">
          <span className="w-32 h-1 bg-pink-500 rounded-full"></span>
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
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10"
      >
        {tours.map((tour) => (
          <motion.div
            key={tour.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6 }}
          >
            <TourCard tour={tour} />
          </motion.div>
        ))}
      </motion.div>

      {/* Nút khám phá thêm */}
      {tours.length > 0 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/categories/du-lich-quoc-te")}
            className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
          >
            🌎 Khám phá thêm
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default TourInternational;
