export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    status: boolean;
    startDate: string | null | undefined;
    endDate: string | null | undefined;
    createdAt: string | null | undefined;
    updatedAt: string | null | undefined;
    type: string;
}
