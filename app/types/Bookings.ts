import { Tour } from "./Tours";

export interface Booking {
    id: number;
    quantity: number;
    total_price: number;
    status: string;
    createAt: string;
    Tour: Tour
}