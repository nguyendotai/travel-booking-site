import { Category } from "../types/Categories";
import { Location } from "../types/Locations";
import { Hotel } from "../types/Hotels";
import { Destination } from "../types/Destination";

export const bookingsMock = [
  {
    id: 1,
    quantity: 2,
    total_price: 3200000,
    status: "confirmed",
    createdAt: "2025-02-10T10:00:00Z",
    Tour: {
      id: 101,
      name: "Tour Đà Lạt 3N2Đ",
      slug: "tour-da-lat-3n2d",
      description: "Tour tham quan Đà Lạt thơ mộng.",
      price: 1500000,
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      duration: "3 ngày 2 đêm",
      capacity: 20,
      image: "/images/tour-dalat.jpg",
      status: "active",
      tourStatus: "upcoming",
      salePrice: 1400000,
      isHotDeal: true,

      location_id: 1,
      hotel_id: 5,
      fixedCategoryId: 2,

      fixedCategory: { id: 2, name: "Trong nước" } as Category,
      optionalCategories: [{ id: 3, name: "Khuyến mãi" }] as Category[],

      Destination: { id: 1, name: "Đà Lạt" } as Destination,
      Location: { id: 1, name: "Lâm Đồng" } as Location,
      Hotel: { id: 5, name: "Dalato Hotel" } as Hotel,

      tourDays: [
        {
          id: 1,
          tourId: 101,
          dayNumber: 1,
          title: "Ngày 1 - Khởi hành",
          description: "Đón khách, di chuyển đến Đà Lạt, nhận phòng khách sạn.",
          TourDayDestinations: [
            {
              id: 1,
              tourDayId: 1,
              destinationId: 1,
              order: 1,
              Destination: { id: 1, name: "Đà Lạt" } as Destination,
            },
          ],
        },
      ],
      createdAt: "2024-10-20",
      updatedAt: "2024-11-01",
    },
  },
];
