"use client";

import { useState } from "react";
import { motion, easeOut } from "framer-motion";
import { User, Lock, Mail, ArrowRight } from "lucide-react";

const formVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut, staggerChildren: 0.2 },
  },
};

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Thêm phone vào state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(), // Loại bỏ khoảng trắng
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.username, // Đổi username thành name để khớp với backend
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone || "", // Gửi phone, để rỗng nếu không có
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        window.location.href = "/login";
      } else {
        alert(data.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      console.error("Lỗi server:", err);
      alert("Lỗi server!");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bea21b4ccc54d80679542e44ce849f57.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/60 to-transparent"></div>
      </div>

      {/* Form Container */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <motion.h2
          className="text-3xl font-extrabold text-gray-800 text-center mb-6"
          variants={inputVariants}
        >
          Đăng Ký
        </motion.h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <motion.div className="mb-4" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <User size={20} className="text-indigo-600" />
              Tên người dùng
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên người dùng"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Email */}
          <motion.div className="mb-4" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Mail size={20} className="text-indigo-600" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email của bạn"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Phone */}
          <motion.div className="mb-4" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <User size={20} className="text-indigo-600" />
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại (tùy chọn)"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Password */}
          <motion.div className="mb-4" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Lock size={20} className="text-indigo-600" />
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div className="mb-6" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Lock size={20} className="text-indigo-600" />
              Xác Nhận Mật Khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            variants={inputVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Đăng Ký
            <ArrowRight className="ml-2 inline" size={20} />
          </motion.button>
        </form>

        {/* Login Link */}
        <motion.p
          className="mt-4 text-center text-sm text-gray-600"
          variants={inputVariants}
        >
          Đã có tài khoản?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Đăng nhập ngay
          </a>
        </motion.p>
      </motion.div>

      {/* Decorative Floating Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"></div>
      <motion.div
        className="absolute top-10 right-10 text-white/30"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      >
        <User size={40} />
      </motion.div>
    </section>
  );
}