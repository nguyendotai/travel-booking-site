"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";

export default function TourSearchForm() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    destination: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tạo query string
    const query = new URLSearchParams();
    if (filters.destination) query.append("destination", filters.destination);
    if (filters.date) query.append("date", filters.date);

    // Điều hướng đến page search với query
    router.push(`/tours/search?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch bg-white border-2 border-yellow-400 rounded-xl overflow-hidden w-full max-w-5xl mx-auto shadow-md"
    >
      {/* Điểm đến */}
      <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
        <FaSearch className="text-gray-400 mr-2" />
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-black">Điểm đến</label>
          <input
            type="text"
            name="destination"
            placeholder="Bạn muốn đi đâu?"
            value={filters.destination}
            onChange={handleChange}
            className="outline-none text-sm w-full text-black"
          />
        </div>
      </div>

      {/* Ngày */}
      <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
        <FaCalendarAlt className="text-gray-400 mr-2" />
        <div className="flex flex-col w-full">
          <label className="text-xs font-semibold text-black">Ngày</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleChange}
            className="outline-none text-sm w-full text-gray-500"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-8 font-medium hover:bg-blue-700 transition"
      >
        Tìm
      </button>
    </form>
  );
}
