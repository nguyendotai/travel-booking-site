"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import { Tour } from "../types/Tours";

interface Booking {
  id: number;
  quantity: number;
  total_price: number;
  status: string;
  createdAt: string;
  Tour: Tour;
}

const STATUS_TABS = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: "Chờ thanh toán" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "cancelled", label: "Đã hủy" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Vui lòng đăng nhập để xem đơn hàng!");
          return;
        }

        const res = await fetch("https://travel-booking-backend-production.up.railway.app/api/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setBookings(data.data || []);
        } else {
          alert(data.message || "Không thể tải danh sách đơn hàng!");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Lọc đơn hàng theo tab
  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        <p className="ml-4 text-lg font-medium text-white">Đang tải...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900">
        <FaClock className="text-5xl mb-4 text-white animate-pulse" />
        <p className="text-xl font-medium text-white">Bạn chưa có đơn hàng nào.</p>
        <button
          onClick={() => window.location.href = "/tours"}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
        >
          Khám phá tour
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10 text-center">
          Lịch Sử Đơn Hàng
        </h1>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
            {STATUS_TABS.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    : "text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        <AnimatePresence>
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
            >
              <p className="text-lg text-white">Không có đơn hàng trong danh mục này.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={`${booking.Tour.image}`}
                      alt={booking.Tour.name}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute top-3 right-3">
                      {booking.status === "pending" && (
                        <span className="flex items-center bg-yellow-500/80 text-white text-xs px-2 py-1 rounded-md">
                          <FaClock className="mr-1" /> Chờ
                        </span>
                      )}
                      {booking.status === "confirmed" && (
                        <span className="flex items-center bg-green-500/80 text-white text-xs px-2 py-1 rounded-md">
                          <FaCheckCircle className="mr-1" /> Xác nhận
                        </span>
                      )}
                      {booking.status === "cancelled" && (
                        <span className="flex items-center bg-red-500/80 text-white text-xs px-2 py-1 rounded-md">
                          <FaTimesCircle className="mr-1" /> Hủy
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {booking.Tour.name}
                    </h3>
                    <p className="text-sm text-purple-200 mt-1">
                      {new Date(booking.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-sm text-gray-300">
                        Số khách: <span className="font-medium text-white">{booking.quantity}</span>
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {booking.total_price.toLocaleString()} ₫
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => alert(`Chi tiết đơn hàng #${booking.id}`)}
                      className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                    >
                      Xem chi tiết
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}