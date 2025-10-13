// components/Footer.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, MotionProps, Variants } from "framer-motion";

interface FooterProps {}

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={footerVariants}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Tourizto</h3>
            <p className="text-sm text-gray-300">
              Khám phá những chuyến đi tuyệt vời cùng Tourizto. Chúng tôi mang đến trải nghiệm du lịch hoàn hảo với các tour trong và ngoài nước.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" className="text-white hover:text-yellow-300 transition-transform hover:scale-110">
                <span className="text-2xl">🌐</span>
              </a>
              <a href="https://instagram.com" target="_blank" className="text-white hover:text-yellow-300 transition-transform hover:scale-110">
                <span className="text-2xl">📸</span>
              </a>
              <a href="https://twitter.com" target="_blank" className="text-white hover:text-yellow-300 transition-transform hover:scale-110">
                <span className="text-2xl">🐦</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/categories/du-lich-trong-nuoc" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Tour trong nước
                </Link>
              </li>
              <li>
                <Link href="/categories/du-lich-quoc-te" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Tour quốc tế
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Liên hệ</h3>
            <p className="text-sm text-gray-300">Email: info@tourizto.com</p>
            <p className="text-sm text-gray-300">Điện thoại: +84 123 456 789</p>
            <p className="text-sm text-gray-300">Địa chỉ: 123 Beach Road, Việt Nam</p>
          </div>
        </motion.div>
        <div className="mt-8 text-center border-t border-white/20 pt-4">
          <p className="text-sm text-gray-300">&copy; {currentYear} Tourizto. All rights reserved.</p>
          <p className="text-sm text-gray-300">Thiết kế với ❤️ bởi Your Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;