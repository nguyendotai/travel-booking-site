import { Category } from "./Categories";
import { Location } from "./Locations";
import { Hotel } from "./Hotels";
import { Destination } from "./Destination";

export interface TourDayDestination {
  id: number;
  tourDayId: number;
  destinationId: number;
  order: number;
  Destination: Destination;
}

export interface TourDay {
  id: number;
  tourId: number;
  dayNumber: number;
  title: string;
  description: string;
  TourDayDestinations: TourDayDestination[];
}

export interface Tour {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  duration: string;
  capacity: number;
  image: string;
  status: string;
  tourStatus: string;
  salePrice: number;
  isHotDeal: boolean;

  location_id: number;
  hotel_id: number;
  fixedCategoryId: number;

  fixedCategory: Category;
  optionalCategories: Category[];

  Destination: Destination;
  Location: Location;  
  Hotel: Hotel;

  // 👇 Thêm dòng này
  tourDays: TourDay[];
}
