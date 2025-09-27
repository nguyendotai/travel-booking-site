"use client";
import React, { useEffect, useState } from "react";
import TourCard from "../ui/TourCard";
import { Tour } from "@/app/types/Tours";

const HotDeals = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tours/hot-deals");
        const data = await res.json();
        if (data.success) {
          setTours(data.data || []);
        }
      } catch (error) {
        console.error("Lỗi khi tải Hot Deals:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center relative drop-shadow-md">
          🔥 Hot Deals
          <span className="block w-32 h-1 bg-white mx-auto mt-3 rounded opacity-80"></span>
        </h2>
        {tours.length === 0 ? (
          <p className="text-center text-white text-lg font-medium drop-shadow-md">Không có Hot Deal nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tours.map((tour, index) => (
              <div
                key={tour.id}
                className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HotDeals;