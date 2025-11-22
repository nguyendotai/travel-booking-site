"use client";
import { useEffect, useState } from "react";
import { Review } from "@/app/types/Reviews";

import { reviewsMock } from "@/app/mock/reviews";

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviewsData = async (): Promise<Review[]> => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return reviewsMock;
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`);
      const data = await res.json();
      return data.data || [];
    }
  };

  useEffect(() => {
    const loadReview = async () => {
      try {
        const review = await fetchReviewsData();
        setReviews(review);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false); // <<< QUAN TRỌNG
      }
    };

    loadReview();
  }, []);

  if (loading)
    return (
      <section className="my-20 max-w-6xl mx-auto text-center">
        <p className="text-lg text-gray-600 animate-pulse">
          Đang tải đánh giá...
        </p>
      </section>
    );

  if (!reviews.length)
    return (
      <section className="my-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Khách hàng nói gì?</h2>
        <p className="text-gray-500">Chưa có đánh giá nào được ghi nhận.</p>
      </section>
    );

  return (
    <section className="my-20 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10 text-indigo-700">
        Khách hàng nói gì?
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <p className="italic text-gray-700 mb-4">“{r.comment}”</p>
            <div className="mt-3">
              <h4 className="font-semibold text-indigo-700">
                {r.userId || "Người dùng ẩn danh"}
              </h4>
              <span className="text-sm text-gray-500">
                {r.tourId?.name ? `Tour: ${r.tourId.name}` : "Không xác định"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
