"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Destination } from "@/app/types/Destination";
import { useRouter } from "next/navigation";

interface Props {
  categoryId: number;
  title: string;
}

export default function TopDestinations({ categoryId, title }: Props) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(
          `https://travel-booking-backend-production.up.railway.app/api/destinations/featured?categoryId=${categoryId}`
        );
        const result = await res.json();
        setDestinations(result.data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      }
    };

    fetchDestinations();
  }, [categoryId]);

  const handleExplore = (id: number) => {
    router.push(`/tours/destination/${id}`);
  };

  return (
    <section className="my-20 max-w-7xl mx-auto px-4">
      {/* Tiêu đề có hiệu ứng xuất hiện */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-10 text-center"
      >
        {title}
      </motion.h2>

      {/* Danh sách địa điểm */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {destinations.map((d, idx) => (
          <motion.div
            key={d.id}
            onClick={() => handleExplore(d.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`relative group rounded-2xl overflow-hidden shadow-md cursor-pointer
              ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}
              ${idx === 3 ? "md:row-span-2" : ""}
            `}
          >
            {/* Ảnh nền */}
            <Image
              src={`${d.image}`}
              alt={d.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay + Text */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="text-center"
              >
                <p
                  className="text-white text-lg md:text-xl font-bold uppercase tracking-wide px-2 
                  transform transition-transform duration-300 group-hover:-translate-y-3"
                >
                  {d.name}
                </p>
                <button
                  className="mt-3 opacity-0 px-6 py-2 group-hover:opacity-100 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Khám phá
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
