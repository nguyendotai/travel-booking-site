import { Tour } from "./Tours";

export interface Review {
    id: number;
    rating: number;
    comment: string;
    userId: number;
    tourId: Tour;
}