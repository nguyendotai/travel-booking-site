import { Location } from "./Locations";

export interface Destination{
    id: number;
    name: string;
    description:string;
    image: string;
    location: Location;
}