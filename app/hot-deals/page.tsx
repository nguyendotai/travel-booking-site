"use client";

import { useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import { Tour } from "@/app/types/Tours";
import { Location } from "@/app/types/Locations";
import TourCard from "@/app/components/ui/TourCard";
import { ArrowDown } from "lucide-react";
import { FaFilter } from "react-icons/fa";

import { toursDomesticMock } from "@/app/mock/toursDomestic";
import { locationsMock } from "@/app/mock/locations";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function TourshotDealPage() {

  const [tours, setTours] = useState<Tour[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<
    "priceAsc" | "priceDesc" | "dateAsc" | "dateDesc"
  >("dateDesc");

  // Fetch tours theo destination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

        // --------------------
        // 🟣 MOCK MODE
        // --------------------
        if (useMock) {
          const mockTours = toursDomesticMock.filter(
            (t) =>
              t.tourStatus === "ongoing" || t.tourStatus === "upcoming"
          );

          setTours(mockTours);
          setLocations(locationsMock);

          return;
        }

        // --------------------
        // 🔵 API MODE
        // --------------------
        const API = process.env.NEXT_PUBLIC_API_URL;

        const [toursRes, locationsRes] = await Promise.all([
          fetch(`${API}/tours/hot-deals`),
          fetch(`${API}/locations`)
        ]);

        const toursJson = await toursRes.json();
        const locationsJson = await locationsRes.json();

        if (toursJson.success && toursJson.data.length > 0) {
          const activeTours = toursJson.data.filter(
            (tour: Tour) =>
              tour.tourStatus === "ongoing" || tour.tourStatus === "upcoming"
          );
          setTours(activeTours);
        }

        if (locationsJson.success) {
          setLocations(locationsJson.data);
        }

      } catch (err) {
        console.error("Error fetching tours/locations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedTours = tours
    .filter((tour) => {
      const price = tour.salePrice ? Number(tour.salePrice) : Number(tour.price);
      if (selectedPriceRange) {
        if (price < selectedPriceRange.min || price > selectedPriceRange.max)
          return false;
      }
      if (selectedLocation && Number(tour.Location?.id) !== selectedLocation)
        return false;
      return true;
    })
    .sort((a, b) => {
      const priceA = Number(a.salePrice) || Number(a.price);
      const priceB = Number(b.salePrice) || Number(b.price);
      if (sortBy === "priceAsc") return priceA - priceB;
      if (sortBy === "priceDesc") return priceB - priceA;
      if (sortBy === "dateAsc")
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (sortBy === "dateDesc")
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      return 0;
    });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-purple-700 animate-pulse">Đang tải tour...</p>
      </div>
    );

  if (!tours.length)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-red-600">Không có tour nào cho điểm đến này</p>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.h1
          className="text-3xl lg:text-4xl font-extrabold text-center text-white mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tour theo điểm đến
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <motion.aside
            className="lg:w-1/4 max-h-[538px] bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sticky top-24 border border-gray-200"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2"
              variants={cardVariants}
            >
              <FaFilter /> Bộ lọc
            </motion.h2>

            {/* Price Range */}
            <motion.div className="mb-8" variants={cardVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Khoảng giá (VNĐ)
              </label>
              <div className="space-y-3">
                {[
                  { label: "Dưới 5 triệu", min: 0, max: 5000000 },
                  { label: "5 - 10 triệu", min: 5000000, max: 10000000 },
                  { label: "10 - 20 triệu", min: 10000000, max: 20000000 },
                  { label: "Trên 20 triệu", min: 20000000, max: Infinity },
                ].map((range, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={
                        selectedPriceRange?.min === range.min &&
                        selectedPriceRange?.max === range.max
                      }
                      onChange={() =>
                        setSelectedPriceRange(
                          selectedPriceRange?.min === range.min ? null : range
                        )
                      }
                      className="accent-indigo-600 w-4 h-4 rounded-lg"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Location */}
            <motion.div className="mb-8" variants={cardVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Địa điểm
              </label>
              <div className="relative">
                <select
                  value={selectedLocation || ""}
                  onChange={(e) =>
                    setSelectedLocation(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-full p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-800 text-sm appearance-none"
                >
                  <option value="">Tất cả</option>
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <ArrowDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                  size={16}
                />
              </div>
            </motion.div>

            {/* Sort */}
            <motion.div className="mb-8" variants={cardVariants}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sắp xếp
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-3 rounded-lg bg-white/90 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-800 text-sm appearance-none"
                >
                  <option value="dateDesc">Ngày mới nhất</option>
                  <option value="dateAsc">Ngày cũ nhất</option>
                  <option value="priceAsc">Giá tăng dần</option>
                  <option value="priceDesc">Giá giảm dần</option>
                </select>
                <ArrowDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
                  size={16}
                />
              </div>
            </motion.div>

            {/* Reset Filter Button */}
            <motion.button
              onClick={() => {
                setSelectedPriceRange(null);
                setSelectedLocation(null);
                setSortBy("dateDesc");
              }}
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              variants={cardVariants}
            >
              Xóa bộ lọc
            </motion.button>
          </motion.aside>

          {/* Tour Cards Grid */}
          <main className="lg:w-3/4">
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredAndSortedTours.map((tour) => (
                <motion.div key={tour.id} variants={cardVariants}>
                  <TourCard tour={tour} />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
