import { Category } from "./Categories";
import { Location } from "./Locations";
import { Hotel } from "./Hotels";
import { Destination } from "./Destination";

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

  location_id: number;
  hotel_id: number;
  fixedCategoryId: number;

  fixedCategory: Category;
  optionalCategories: Category[];

  Destination: Destination;
  Location: Location;  
  Hotel: Hotel;       
}
