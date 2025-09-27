"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Destination } from "@/app/types/Destination";

export default function TopDestinationsDomestic() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/destinations/featured?categoryId=1");
        const result = await res.json();
        setDestinations(result.data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <section className="my-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Điểm đến nổi bật trong nước</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4">
        {destinations.map((d, idx) => (
          <div
            key={idx}
            className={`relative group rounded-2xl overflow-hidden shadow-md 
              ${idx === 0 ? "md:col-span-2 md:row-span-2" : ""}
              ${idx === 3 ? "md:row-span-2" : ""}
            `}
          >
            <Image
              src={`http://localhost:5000${d.image}`}
              alt={d.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition flex items-center justify-center">
              <p className="text-white text-lg md:text-xl font-bold uppercase tracking-wide text-center px-2">
                {d.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
