"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/app/types/Tours";
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
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <motion.div
      className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md mx-auto overflow-hidden flex flex-col min-h-[480px]"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      {/* Image Section */}
      <div className="relative w-full h-64">
        <Image
          src={`http://localhost:5000${tour.image}`}
          alt={tour.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay Badge for Location and Duration */}
        <div className="absolute top-4 left-4 bg-indigo-900/70 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
          <MapPin size={14} />
          {tour.Location?.name} ·{" "}
          {tour.startDate && tour.endDate && (
            <span>
              {(() => {
                const start = new Date(tour.startDate);
                const end = new Date(tour.endDate);
                const days =
                  Math.round(
                    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                  ) + 1;
                const nights = days > 0 ? days - 1 : 0;
                return `${days} ngày ${nights} đêm`;
              })()}
            </span>
          )}
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-indigo-900/50 px-3 py-1 rounded-full">
            Khám phá {tour.name}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow gap-4">
        {/* Tour Name */}
        <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
          {tour.name}
        </h2>

        {/* Price and Capacity */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col min-h-[48px] justify-center">
            {tour.salePrice && Number(tour.salePrice) < Number(tour.price) ? (
              <>
                <span className="text-xl font-bold text-indigo-600">
                  {new Intl.NumberFormat("vi-VN").format(
                    Number(tour.salePrice)
                  )}
                  ₫
                </span>
                <span className="text-sm text-gray-400 line-through">
                  {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-indigo-600">
                {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{tour.capacity} khách</span>
        </div>

        <div className="limit-2-lines">{tour.description}</div>

        {/* Call to Action */}
        <Link
          href={`/tours/${tour.slug}`}
          className="mt-auto w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Xem chi tiết
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default TourCard;
