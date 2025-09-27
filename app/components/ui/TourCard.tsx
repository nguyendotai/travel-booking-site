"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tour } from "@/app/types/Tours";
import { motion, easeOut } from "framer-motion";
import { MapPin, Hotel, ArrowRight } from "lucide-react";

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
      className="relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md mx-auto overflow-hidden flex flex-col min-h-[450px]"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
    >
      {/* Image Section with Overlay */}
      <div className="relative w-full h-56">
        <Image
          src={`http://localhost:5000${tour.image}`}
          alt={tour.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-sm font-medium bg-indigo-900/50 px-3 py-1 rounded-full">
            Khám phá {tour.name}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <p className="text-white text-sm">
            {tour.Location?.name} · {tour.startDate && tour.endDate && (
            <span className="text-xs  px-2 py-1 rounded-lg">
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
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Tour Name and Duration */}
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-bold text-gray-800 ">{tour.name}</h2>
          
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-3 truncate line-clamp-2 flex-grow">
          {tour.description}
        </p>

        {/* Price and Capacity */}
        <div className="flex justify-between items-center mb-3">
          <div className="min-h-[3.5rem] flex flex-col justify-center">
            {tour.salePrice && Number(tour.salePrice) < Number(tour.price) ? (
              <>
                <span className="text-lg font-bold text-indigo-600">
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
              <span className="text-lg font-bold text-indigo-600">
                {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{tour.capacity} khách</span>
        </div>

        {/* Tags: Location, Hotel */}
        <div className="flex flex-col gap-2 min-h-14 mb-3">
          {tour.Location && (
            <div className="text-xs text-gray-700 flex items-center gap-1">
              <MapPin size={16} className="text-indigo-600" />
              <span className="font-semibold">Địa điểm:</span>
              <span>{tour.Location.name}</span>
            </div>
          )}
          {tour.Hotel && (
            <div className="text-xs text-gray-700 flex items-center gap-1">
              <Hotel size={16} className="text-indigo-600" />
              <span className="font-semibold">Khách sạn:</span>
              <span>{tour.Hotel.name}</span>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <Link
          href={`/tours/${tour.slug}`}
          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group"
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
