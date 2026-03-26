"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import { MapPin, Hotel, Users, Calendar, ArrowLeft, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Tour } from "@/app/types/Tours";
import { toursDomesticMock } from "@/app/mock/toursDomestic";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, when: "beforeChildren", staggerChildren: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: easeOut } },
};

interface Review {
  id: number;
  rating: number;
  comment: string;
  User?: { name: string };
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
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  useEffect(() => {
    const fetchTour = async () => {
      try {
        let data: Tour | undefined;

        if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
          data = toursDomesticMock.find(t => t.slug === slug);
        } else {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tours/${slug}`);
          const result = await res.json();
          data = result.data;
        }

        if (data) {
          setTour(data);
          fetchReviews(data.id);
        }
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async (tourId: number) => {
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
          setReviews([]); // mock có thể không có review
        } else {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/tour/${tourId}`);
          const result = await res.json();
          if (result.success) setReviews(result.data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchTour();
  }, [slug]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;
    if (!newReview.comment.trim()) return alert("Vui lòng nhập nội dung đánh giá.");

    setSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK !== "true") {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/tour/${tour.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ tourId: tour.id, rating: newReview.rating, comment: newReview.comment }),
        });
        const result = await res.json();
        if (result.success) {
          setNewReview({ rating: 5, comment: "" });
          setReviews(prev => [...prev, { ...newReview, id: Date.now(), User: { name: "Bạn" }, createdAt: new Date().toISOString() }]);
        } else alert(result.error || "Gửi đánh giá thất bại!");
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
        <p className="text-2xl text-teal-800 animate-pulse font-semibold">Đang tải...</p>
      </div>
    );

  if (!tour)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-100">
        <p className="text-2xl text-red-600 font-semibold">Không tìm thấy tour</p>
      </div>
    );

  const start = new Date(tour.startDate);
  const end = new Date(tour.endDate);
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const nights = days > 0 ? days - 1 : 0;

  return (
    <section className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-cyan-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto bg-white/95 rounded-3xl shadow-2xl overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        {/* Hero Image */}
        <motion.div className="relative w-full h-64 sm:h-96 lg:h-[500px]" variants={contentVariants}>
          <Image src={tour.image} alt={tour.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <motion.h1 className="absolute bottom-6 left-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg" variants={contentVariants}>
            {tour.name}
          </motion.h1>
        </motion.div>

        {/* Main Content */}
        <div className="p-6 sm:p-8 lg:p-12">
          <motion.div className="flex flex-col lg:flex-row gap-8" variants={contentVariants}>
            {/* Tour Info */}
            <div className="lg:w-2/3">
              <motion.p className="text-gray-700 text-lg leading-relaxed mb-6" variants={contentVariants}>
                {tour.description}
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base mb-6">
                {tour.Location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="text-teal-600" size={20} />
                    <span>
                      <strong>Địa điểm:</strong> {tour.Location.name}
                    </span>
                  </p>
                )}
                {tour.Hotel && (
                  <p className="flex items-center gap-2">
                    <Hotel className="text-teal-600" size={20} />
                    <span>
                      <strong>Khách sạn:</strong> {tour.Hotel.name}
                    </span>
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Calendar className="text-teal-600" size={20} />
                  <span>
                    <strong>Thời gian:</strong> {days} ngày {nights} đêm
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Users className="text-teal-600" size={20} />
                  <span>
                    <strong>Số khách:</strong> {tour.capacity}
                  </span>
                </p>
              </div>

              {/* Price */}
              <motion.div className="mb-6" variants={contentVariants}>
                {tour.salePrice && Number(tour.salePrice) < Number(tour.price) ? (
                  <div className="flex items-center gap-3">
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                      {new Intl.NumberFormat("vi-VN").format(Number(tour.salePrice))}₫
                    </p>
                    <p className="text-gray-500 line-through text-lg">
                      {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
                    </p>
                  </div>
                ) : (
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {new Intl.NumberFormat("vi-VN").format(Number(tour.price))}₫
                  </p>
                )}
              </motion.div>

              {/* Buttons */}
              <motion.div className="flex flex-col sm:flex-row gap-4" variants={contentVariants}>
                <Link
                  href="/tours"
                  className="flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2" size={18} />
                  Quay lại
                </Link>
                <button
                  onClick={handleBooking}
                  className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300"
                >
                  Đặt ngay
                  <ArrowRight className="ml-2" size={18} />
                </button>
              </motion.div>
            </div>

            {/* Tabs */}
            <motion.div className="lg:w-1/3 mt-8 lg:mt-0" variants={contentVariants}>
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`flex-1 py-3 text-center font-semibold text-lg ${activeTab === "details" ? "border-b-2 border-teal-600 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600" : "text-gray-500 hover:text-teal-600"}`}
                  onClick={() => setActiveTab("details")}
                >
                  Lịch trình
                </button>
                <button
                  className={`flex-1 py-3 text-center font-semibold text-lg ${activeTab === "reviews" ? "border-b-2 border-teal-600 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600" : "text-gray-500 hover:text-teal-600"}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Đánh giá
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "details" && tour.tourDays && tour.tourDays.length > 0 && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {tour.tourDays.map(day => (
                    <div key={day.id} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-3">
                        Ngày {day.dayNumber}: {day.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{day.description}</p>
                      {day.TourDayDestinations && day.TourDayDestinations.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-800">📍 Điểm đến:</h4>
                          <ul className="space-y-4">
                            {day.TourDayDestinations.map(d => (
                              <li key={d.id} className="flex flex-col sm:flex-row gap-4 items-start">
                                <div className="flex-1">
                                  <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                                    {d.Destination?.name}
                                  </p>
                                  {d.Destination?.description && <p className="text-gray-600 text-sm mt-1">{d.Destination.description}</p>}
                                </div>
                                {d.Destination?.image && (
                                  <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shadow-md">
                                    <Image src={d.Destination.image.startsWith("http") ? d.Destination.image : `${process.env.NEXT_PUBLIC_API_URL}${d.Destination.image}`} alt={d.Destination.name} fill className="object-cover" />
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {reviews.length > 0 ? (
                    reviews.map(r => (
                      <div key={r.id} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-800">{r.User?.name || "Ẩn danh"}</p>
                          <div className="flex">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}</div>
                        </div>
                        <p className="text-gray-700">{r.comment}</p>
                        <p className="text-gray-400 text-sm mt-1">{new Date(r.createdAt).toLocaleDateString("vi-VN")}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
                  )}

                  <form onSubmit={handleSubmitReview} className="mt-6 bg-white p-5 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Gửi đánh giá của bạn</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-700">Số sao:</span>
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} size={22} onClick={() => setNewReview({ ...newReview, rating: s })} className={`cursor-pointer ${s <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <textarea value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} rows={3} placeholder="Nhập nội dung đánh giá..." className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    <button type="submit" disabled={submitting} className="mt-4 px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition disabled:opacity-50">
                      {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                    </button>
                  </form>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
