"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Tour } from "@/app/types/Tours";
import { Location } from "@/app/types/Locations";
import TourCard from "@/app/components/ui/TourCard";
import { ArrowDown } from "lucide-react";
import { FaFilter } from "react-icons/fa";

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

export default function ToursByCategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const [tours, setTours] = useState<Tour[]>([]);
  const [categoryImage, setCategoryImage] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<
    "priceAsc" | "priceDesc" | "dateAsc" | "dateDesc"
  >("dateDesc");

  useEffect(() => {
    if (slug) {
      fetchTours(slug);
      fetchLocations(slug);
    }
  }, [slug]);

  const fetchTours = async (slug: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tours/fixed-category/${slug}`
      );
      const data = await res.json();

      if (data.success && data.data.length > 0) {
        const ongoingTours = data.data.filter(
          (tour: Tour) => tour.tourStatus === "ongoing"
        );
        setTours(ongoingTours);
        setCategoryName(data.data[0].fixedCategory?.name || "");
        const imageUrl = data.data[0].fixedCategory?.image
          ? `http://localhost:5000${data.data[0].fixedCategory.image}`
          : "/fallback.jpg";
        setCategoryImage(imageUrl);
      }
    } catch (err) {
      console.error("Lỗi lấy tour:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLocations = async (slug: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/locations/category/${slug}`
      );
      const data = await res.json();
      if (data.success) setLocations(data.data);
    } catch (err) {
      console.error("Lỗi lấy địa điểm:", err);
    }
  };

  const filteredAndSortedTours = tours
    .filter((tour) => {
      const price = tour.salePrice
        ? Number(tour.salePrice)
        : Number(tour.price);
      if (selectedPriceRange) {
        if (price < selectedPriceRange.min || price > selectedPriceRange.max) {
          return false;
        }
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
        return (
          new Date(a.startDate || "").getTime() -
          new Date(b.startDate || "").getTime()
        );
      if (sortBy === "dateDesc")
        return (
          new Date(b.startDate || "").getTime() -
          new Date(a.startDate || "").getTime()
        );
      return 0;
    });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-white animate-pulse">Đang tải tour...</p>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Parallax Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${categoryImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.h1
          className="text-3xl lg:text-4xl font-extrabold text-center text-white bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Khám Phá Tour {categoryName}
        </motion.h1>

        {/* Sidebar + Content Layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <motion.aside
            className="lg:w-1/4 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sticky top-24 border border-gray-200"
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

            {/* Price Range Suggestions */}
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

        {/* Decorative Floating Elements */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
