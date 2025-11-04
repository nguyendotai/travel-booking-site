"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Tour } from "@/app/types/Tours";
import { FaUsers, FaCreditCard, FaCheckCircle } from "react-icons/fa";

export default function BookingPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [method, setMethod] = useState("credit_card");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`https://travel-booking-backend-production.up.railway.app/api/tours/${slug}`);
        const result = await res.json();
        setTour(result.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  const handleBooking = async () => {
    if (!tour) return;

    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://travel-booking-backend-production.up.railway.app/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tour_id: tour.id,
          quantity,
          method
        }),
      });

      const data = await res.json();

      if (res.ok) {
       window.location.href = data.checkoutUrl;

      } else {
        alert(data.message || "Có lỗi xảy ra!");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Lỗi kết nối server");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600"></div>
        <p className="ml-4 text-lg text-gray-700">Đang tải...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600 font-semibold">
          Không tìm thấy tour
        </p>
      </div>
    );
  }

  const unitPrice =
    tour.salePrice && Number(tour.salePrice) < Number(tour.price)
      ? Number(tour.salePrice)
      : Number(tour.price);

  const total = unitPrice * quantity;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 mt-12">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Tour Info Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
          <div className="relative h-80 w-full">
            <Image
              src={`${tour.image}`}
              alt={tour.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-4 left-4 text-2xl sm:text-3xl font-bold text-white">
              {tour.name}
            </h1>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-gray-600 mb-6 leading-relaxed">
              {tour.description?.slice(0, 200)}...
            </p>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-800">
                Giá mỗi khách:{" "}
                <span className="text-teal-600">
                  {unitPrice.toLocaleString()} ₫
                </span>
              </p>
              {tour.salePrice && (
                <p className="text-sm text-green-500 font-medium">
                  Tiết kiệm:{" "}
                  {(
                    ((Number(tour.price) - Number(tour.salePrice)) /
                      Number(tour.price)) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUsers className="mr-2 text-teal-600" /> Đặt Tour
          </h2>

          <div className="space-y-6">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng khách
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {/* Payment Method Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phương thức thanh toán
              </label>
              <div className="relative">
                <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                >
                  <option value="credit_card">Thẻ tín dụng</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Chuyển khoản</option>
                  <option value="stripe">Thanh toán qua Stripe</option>
                </select>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="bg-teal-50 border border-teal-200 p-6 rounded-lg">
              <p className="text-gray-600 text-sm">Tổng thanh toán</p>
              <p className="text-3xl font-bold text-teal-700 mt-1">
                {total.toLocaleString()} ₫
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Bao gồm tất cả thuế và phí
              </p>
            </div>
          </div>

          <button
            onClick={handleBooking}
            disabled={processing}
            className="mt-8 w-full px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 disabled:bg-teal-300 disabled:cursor-not-allowed transition flex items-center justify-center"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white mr-2"></div>
                Đang xử lý...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2" />
                Xác nhận đặt tour
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
