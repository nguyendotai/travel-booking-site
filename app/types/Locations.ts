export interface Location{
    id: number;
    name: string;
    country: string;
    description: string;
    status: boolean;
    createdAt: string | null | undefined;
    updatedAt: string | null | undefined;
    fixedCategoryId: number
}