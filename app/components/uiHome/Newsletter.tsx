"use client";

export default function Newsletter() {
  return (
    <section className="my-20 max-w-3xl mx-auto text-center bg-orange-100 p-10 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Đăng ký nhận ưu đãi</h2>
      <p className="mb-6 text-gray-600">Nhập email để không bỏ lỡ các chương trình khuyến mãi hấp dẫn.</p>
      <form className="flex gap-3 justify-center">
        <input 
          type="email" 
          placeholder="Nhập email của bạn..." 
          className="px-4 py-3 rounded-xl w-64 border border-gray-300 focus:outline-none"
        />
        <button className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600">Đăng ký</button>
      </form>
    </section>
  );
}
