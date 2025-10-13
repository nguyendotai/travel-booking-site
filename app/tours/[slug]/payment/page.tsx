"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/bookings/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      // tìm booking theo id
      const booking = data.data.find((b: any) => b.id == bookingId);
      if (booking) {
        setPayment(booking.Payment);
      }
    };
    fetchPayment();
  }, [bookingId]);

  const handleConfirm = async () => {
    if (!payment) return;
    try {
      const res = await fetch("http://localhost:5000/api/bookings/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: payment.id,
          status: "paid",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Thanh toán thành công!");
      } else {
        alert(data.message || "Có lỗi xảy ra");
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  if (!payment) return <p className="p-10">Đang tải...</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Thanh toán tour</h1>
      <p className="mb-2">Số tiền: {payment.amount.toLocaleString()} ₫</p>
      <p className="mb-2">Phương thức: {payment.method}</p>
      <p className="mb-2">Trạng thái: {payment.status}</p>

      {payment.status === "pending" && (
        <button
          onClick={handleConfirm}
          className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Xác nhận đã thanh toán
        </button>
      )}
    </div>
  );
}
