"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TourCard from "../ui/TourCard";
import { Tour } from "@/app/types/Tours";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { toursDomesticMock } from "@/app/mock/toursDomestic";

const TourDomestic = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const TOURS_PER_PAGE = 5;
  const MAX_TOURS = 10;

  const fetchToursData = async (): Promise<Tour[]> => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return (
        toursDomesticMock
          .filter(
            (tour) =>
              tour.tourStatus === "ongoing" || tour.tourStatus === "upcoming"
          )
          .filter((tour) => tour.fixedCategory.slug === "du-lich-trong-nuoc")
          .slice(0, MAX_TOURS)
      );
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tours/fixed-category/du-lich-trong-nuoc`
      );
      const data = await res.json();
      return (data.data || []).filter(
        (tour: Tour) =>
          tour.tourStatus === "ongoing" || tour.tourStatus === "upcoming"
      );
    }
  };

  useEffect(() => {
    const loadTours = async () => {
      try {
        const toursData = await fetchToursData();
        setTours(toursData.slice(0, MAX_TOURS));
      } catch (error) {
        console.error("Lỗi khi tải tour trong nước:", error);
      }
    };
    loadTours();
  }, []);

  const totalSlides = Math.max(0, tours.length - TOURS_PER_PAGE + 1);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50 py-10 overflow-hidden">
      {/* Header + Buttons */}
      <div className="max-w-[1500px] mx-auto px-8 ">
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-4xl font-bold text-gray-900"
            >
              Khám Phá Tour Trong Nước
            </motion.h2>
            <div className="mt-3 w-32 h-1 bg-blue-500 rounded-full"></div>
          </div>

          {tours.length > TOURS_PER_PAGE && (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full border-2 transition-all ${
                  currentIndex === 0
                    ? "border-gray-300 text-gray-300"
                    : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                disabled={currentIndex >= totalSlides - 1}
                className={`p-3 rounded-full border-2 transition-all ${
                  currentIndex >= totalSlides - 1
                    ? "border-gray-300 text-gray-300"
                    : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * (100 / TOURS_PER_PAGE)}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="flex-shrink-0"
                style={{ width: `${100 / TOURS_PER_PAGE}%` }}
              >
                <div className="px-3">
                  <TourCard tour={tour} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        {tours.length > TOURS_PER_PAGE && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "bg-blue-500 w-8 h-2"
                    : "bg-gray-300 w-2 h-2"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Nút khám phá thêm */}
      {tours.length > 0 && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/categories/du-lich-trong-nuoc")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-all"
          >
            Khám phá thêm
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default TourDomestic;
