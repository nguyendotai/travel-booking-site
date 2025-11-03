"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TourCard from "../ui/TourCard";
import { Tour } from "@/app/types/Tours";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HotDeals = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClickedExplore, setHasClickedExplore] = useState(false);
  const router = useRouter();

  const TOURS_PER_PAGE = 5;
  const MAX_TOURS = 10;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tours/hot-deals");
        const data = await res.json();
        const filteredTours = (data.data || [])
          .filter(
            (tour: Tour) =>
              tour.tourStatus === "ongoing" || tour.tourStatus === "upcoming"
          )
          .slice(0, MAX_TOURS); // Tối đa 10 tour

        setTours(filteredTours);
      } catch (error) {
        console.error("Lỗi khi tải Hot Deals:", error);
      }
    };
    fetchTours();
  }, []);

  // Kiểm tra đã click "Khám phá thêm" chưa
useEffect(() => {
  // Nếu người dùng đã thấy nút rồi thì ẩn luôn (không animate nữa)
  const seen = localStorage.getItem("hasSeenHotDealsButton");
  if (seen === "true") {
    setHasClickedExplore(true);
  }

  const clicked = localStorage.getItem("hasClickedHotDealsExplore");
  if (clicked === "true") {
    setHasClickedExplore(true);
  }
}, []);


  const totalSlides = Math.max(0, tours.length - TOURS_PER_PAGE + 1);

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleExploreClick = () => {
    if (hasClickedExplore) return;
    setHasClickedExplore(true);
    localStorage.setItem("hasClickedHotDealsExplore", "true");
    router.push("/hot-deals");
  };

  return (
    <section className="relative bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Header + Buttons */}
      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
            >
              Hot Deals
            </motion.h2>
            <div className="mt-3 w-32 h-1 bg-white rounded-full opacity-80"></div>
          </div>

          {tours.length > TOURS_PER_PAGE && (
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`p-3 rounded-full border-2 border-white/50 backdrop-blur-sm transition-all ${
                  currentIndex === 0
                    ? "text-white/40 cursor-not-allowed"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                disabled={currentIndex >= totalSlides - 1}
                className={`p-3 rounded-full border-2 border-white/50 backdrop-blur-sm transition-all ${
                  currentIndex >= totalSlides - 1
                    ? "text-white/40 cursor-not-allowed"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-[1500px] mx-auto px-6 relative z-10">
        {tours.length === 0 ? (
          <p className="text-center text-white text-lg font-medium drop-shadow-md">
            Không có Hot Deal nào.
          </p>
        ) : (
          <>
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{
                  x: `-${currentIndex * (100 / TOURS_PER_PAGE)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
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
                      idx === currentIndex ? "bg-white w-8 h-2" : "bg-white/50 w-2 h-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Nút Khám phá thêm - Chỉ click 1 lần */}
      {tours.length > 0 && (
        <motion.div
          className="text-center mt-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={hasClickedExplore ? {} : { scale: 1.05 }}
            whileTap={hasClickedExplore ? {} : { scale: 0.95 }}
            onClick={handleExploreClick}
            disabled={hasClickedExplore}
            className={`px-6 py-3 font-semibold rounded-full shadow-lg transition-all duration-300 ${
              hasClickedExplore
                ? "bg-white/60 text-orange-600 cursor-not-allowed"
                : "bg-white text-orange-500 hover:bg-orange-100"
            }`}
          >
            {hasClickedExplore ? "Đã khám phá" : "Khám phá thêm"}
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default HotDeals;