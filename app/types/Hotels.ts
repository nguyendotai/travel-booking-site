export interface Hotel{
    id: number;
    name: string;
    address: string;
    description: string | null;
    rating: number | null;
    status: boolean | null;
    createdAt: string | null | undefined;
    updatedAt: string | null | undefined;
}