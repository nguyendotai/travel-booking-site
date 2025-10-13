"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import {
  MapPin,
  Hotel,
  Users,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Tour } from "@/app/types/Tours";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

interface Review {
  id: number;
  rating: number;
  comment: string;
  User?: {
    name: string;
  };
  createdAt: string;
}

export default function TourDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  // Lấy thông tin tour
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tours/${slug}`);
        const result = await res.json();
        setTour(result.data);

        // Sau khi có tour thì fetch review
        if (result.data?.id) fetchReviews(result.data.id);
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  // Lấy danh sách review
  const fetchReviews = async (tourId: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/reviews/tour/${tourId}`
      );
      const result = await res.json();
      if (result.success) {
        setReviews(result.data);
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // Gửi đánh giá
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    if (!newReview.comment.trim())
      return alert("Vui lòng nhập nội dung đánh giá.");

    setSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/tour/${tour.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          tourId: tour.id,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });
      const result = await res.json();

      if (result.success) {
        setNewReview({ rating: 5, comment: "" });
        fetchReviews(tour.id);
      } else {
        alert(result.error || "Gửi đánh giá thất bại!");
      }
    } catch (err) {
      console.error("Submit review error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBooking = () => {
    router.push(`/tours/${slug}/booking`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white">
        <p className="text-xl text-purple-700 animate-pulse font-medium">
          Đang tải...
        </p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white">
        <p className="text-xl text-red-600 font-medium">Không tìm thấy tour</p>
      </div>
    );
  }

  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const days =
    Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const nights = days > 0 ? days - 1 : 0;

  return (
    <section className="relative min-h-screen py-16 bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden">
      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-10 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <motion.div
            className="relative w-full lg:w-1/2 h-64 sm:h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-lg"
            variants={contentVariants}
          >
            <Image
              src={`http://localhost:5000${tour.image}`}
              alt={tour.name}
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              priority
            />
          </motion.div>

          {/* Info Section */}
          <motion.div
            className="flex flex-col justify-between lg:w-1/2"
            variants={contentVariants}
          >
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
                {tour.name}
              </h1>

              <p className="text-gray-700 mb-6 leading-relaxed text-base sm:text-lg">
                {tour.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
                {tour.Location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="text-purple-600" size={20} />
                    <span>
                      <strong>Địa điểm:</strong> {tour.Location.name}
                    </span>
                  </p>
                )}
                {tour.Hotel && (
                  <p className="flex items-center gap-2">
                    <Hotel className="text-purple-600" size={20} />
                    <span>
                      <strong>Khách sạn:</strong> {tour.Hotel.name}
                    </span>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Calendar className="text-purple-600" size={20} />
                  <span>
                    <strong>Thời gian:</strong> {days} ngày {nights} đêm
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="text-purple-600" size={20} />
                  <span>
                    <strong>Số khách:</strong> {tour.capacity}
                  </span>
                </p>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="mt-6 sm:mt-8">
              {tour.salePrice && Number(tour.salePrice) < Number(tour.price) ? (
                <div className="flex items-center gap-3">
                  <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                    {new Intl.NumberFormat("vi-VN").format(
                      Number(tour.salePrice)
                    )}
                    ₫
                  </p>
                  <p className="text-gray-500 line-through text-base sm:text-lg">
                    {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
                  </p>
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl font-bold text-purple-700">
                  {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
                </p>
              )}

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/tours"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
                >
                  <ArrowLeft className="mr-1.5" size={16} />
                  Quay lại
                </Link>
                <button
                  onClick={handleBooking}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transform hover:scale-105 transition-all duration-300"
                >
                  Đặt ngay
                  <ArrowRight className="ml-1.5" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          className="mt-12 border-t border-gray-200 pt-8"
          variants={contentVariants}
        >
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Đánh giá từ khách hàng
          </h2>

          {/* Danh sách đánh giá */}
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-800">
                      {r.User?.name || "Ẩn danh"}
                    </p>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{r.comment}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
          )}

          {/* Form gửi đánh giá */}
          <form
            onSubmit={handleSubmitReview}
            className="mt-8 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Gửi đánh giá của bạn
            </h3>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-700">Số sao:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={22}
                  onClick={() => setNewReview({ ...newReview, rating: s })}
                  className={`cursor-pointer ${
                    s <= newReview.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              rows={3}
              placeholder="Nhập nội dung đánh giá..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {submitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
