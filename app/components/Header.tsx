"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, User, LogOut, Briefcase } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../store/authSlice";
import { motion, easeOut } from "framer-motion";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: easeOut },
  },
};

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/categories/du-lich-trong-nuoc", label: "Tour trong nước" },
    { href: "/categories/du-lich-quoc-te", label: "Tour quốc tế" },
    { href: "/about", label: "Giới thiệu" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-blue-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md hover:scale-105 transition-transform duration-300">
            Tourizto
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                pathname === link.href
                  ? "bg-white text-indigo-900"
                  : "text-white hover:bg-white/20 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="relative ml-4">
              <motion.button
                onClick={toggleDropdown}
                className="flex items-center px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User size={18} className="mr-2" />
                {user.name}
              </motion.button>
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="p-4 text-gray-800">
                    <p className="text-sm font-semibold text-indigo-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 mb-3 truncate">{user.email}</p>
                    <Link
                      href="/profile"
                      className="block mb-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <Link
                      href="/my-bookings"
                      className="block mb-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-transparent border border-indigo-600 text-indigo-600 rounded-md text-sm font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Đăng nhập
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white hover:text-purple-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-indigo-950 text-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: easeOut }}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white hover:text-purple-300 focus:outline-none"
            onClick={toggleMenu}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-start p-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`w-full text-lg font-medium transition-colors duration-200 ${
                pathname === link.href
                  ? "text-purple-300 border-l-4 border-purple-300 pl-3"
                  : "text-white hover:text-purple-300 hover:pl-3"
              }`}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="w-full space-y-4">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg">
                <p className="text-lg font-medium text-white truncate">{user.name}</p>
                <p className="text-sm text-gray-300 truncate">{user.email}</p>
              </div>
              <Link
                href="/profile"
                className="block w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-center font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                onClick={toggleMenu}
              >
                Hồ sơ
              </Link>
              <Link
                href="/my-bookings"
                className="block w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-center font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                onClick={toggleMenu}
              >
                Đơn hàng của tôi
              </Link>
              <button
                onClick={() => {
                  dispatch(logout());
                  toggleMenu();
                }}
                className="w-full py-2 bg-transparent border border-purple-300 text-purple-300 rounded-lg font-semibold hover:bg-purple-300 hover:text-indigo-900 transition-all duration-300 flex items-center justify-center"
              >
                <LogOut size={16} className="mr-2" />
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="w-full text-lg font-medium text-center py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              onClick={toggleMenu}
            >
              Đăng nhập
            </Link>
          )}
        </nav>
      </motion.div>
    </header>
  );
}