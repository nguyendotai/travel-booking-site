"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login } from "../store/authSlice";
import { motion, easeOut } from "framer-motion";
import { User, Lock, ArrowRight } from "lucide-react";

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

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập API call để đăng nhập
    dispatch(login(formData));
  };

  if (token) {
    window.location.href = "/"; // chuyển hướng sau login
  }

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
          Đăng Nhập
        </motion.h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <motion.div className="mb-4" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <User size={20} className="text-indigo-600" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Nhập email của bạn"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Password */}
          <motion.div className="mb-6" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <Lock size={20} className="text-indigo-600" />
              Mật Khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              placeholder="Nhập mật khẩu"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
            />
          </motion.div>

          {/* Hiển thị lỗi */}
          {error && (
            <motion.p
              className="text-red-500 text-center font-medium mb-4"
              variants={inputVariants}
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            } text-white font-semibold rounded-lg shadow-lg transition-all duration-300`}
            variants={inputVariants}
            whileHover={{ scale: !loading ? 1.02 : 1 }}
            whileTap={{ scale: !loading ? 0.98 : 1 }}
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            {!loading && <ArrowRight className="ml-2 inline" size={20} />}
          </motion.button>
        </form>

        {/* Register Link */}
        <motion.p
          className="mt-4 text-center text-sm text-gray-600"
          variants={inputVariants}
        >
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Đăng ký ngay
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
