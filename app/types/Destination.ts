
export interface Destination{
    id: number;
    name: string;
    description:string;
    image: string;
    status: boolean;
    featured: boolean;
    createdAt: string | null | undefined;
    updatedAt: string | null | undefined;
    location_id: number; 
}