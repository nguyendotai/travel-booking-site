"use client";

export default function Testimonials() {
  const reviews = [
    { name: "Ngọc Anh", text: "Chuyến đi cực kỳ tuyệt vời, dịch vụ chu đáo!", location: "Đà Nẵng" },
    { name: "Hoàng Minh", text: "Mình và gia đình đã có trải nghiệm đáng nhớ.", location: "Hạ Long" },
    { name: "Lan Phương", text: "Hướng dẫn viên nhiệt tình, lịch trình hợp lý.", location: "Phú Quốc" },
  ];

  return (
    <section className="my-20 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">Khách hàng nói gì?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, idx) => (
          <div key={idx} className="p-6 rounded-2xl shadow-lg bg-white">
            <p className="italic mb-4">“{r.text}”</p>
            <h4 className="font-semibold">{r.name}</h4>
            <span className="text-sm text-gray-500">{r.location}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
