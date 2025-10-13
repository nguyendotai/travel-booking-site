"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../store/authSlice";
import { RootState, AppDispatch } from "../store/store";

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: user?.id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  // Cập nhật lại form khi user thay đổi
  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await dispatch(updateProfile(form)).unwrap();
      alert("Cập nhật hồ sơ thành công!");
      setIsEditing(false);
    } catch (error) {
      alert("Cập nhật thất bại!");
      console.error(error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
        <p className="ml-4 text-lg font-medium text-white">Đang tải hồ sơ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Hồ Sơ Cá Nhân
        </h1>

        <div className="flex flex-col items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="h-24 w-24 bg-white/20 text-white flex items-center justify-center rounded-full text-4xl font-bold mb-4 shadow-lg"
          >
            {user.name.charAt(0).toUpperCase()}
          </motion.div>
          <p className="text-xl font-semibold text-white">{user.name}</p>
          <p className="text-sm text-purple-200">{user.email}</p>
        </div>

        <AnimatePresence>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 bg-white/10 p-4 rounded-lg border border-white/20"
            >
              <FaUser className="text-purple-300 text-lg" />
              {isEditing ? (
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-purple-300 focus:border-purple-400 outline-none text-white py-1 placeholder-purple-300"
                  placeholder="Tên của bạn"
                />
              ) : (
                <p className="text-white font-medium">{user.name}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-3 bg-white/10 p-4 rounded-lg border border-white/20"
            >
              <FaEnvelope className="text-purple-300 text-lg" />
              <p className="text-white font-medium">{user.email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-3 bg-white/10 p-4 rounded-lg border border-white/20"
            >
              <FaPhone className="text-purple-300 text-lg" />
              {isEditing ? (
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-purple-300 focus:border-purple-400 outline-none text-white py-1 placeholder-purple-300"
                  placeholder="Số điện thoại"
                />
              ) : (
                <p className="text-white font-medium">
                  {user.phone || "Chưa cập nhật"}
                </p>
              )}
            </motion.div>
          </div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-purple-700 transition"
            >
              <FaSave /> Lưu Thay Đổi
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 font-semibold hover:bg-purple-700 transition"
            >
              <FaEdit /> Chỉnh Sửa
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
