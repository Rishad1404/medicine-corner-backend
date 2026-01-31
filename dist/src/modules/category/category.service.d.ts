import { Category } from "../../../generated/prisma/client";
export declare const categoryService: {
    createCategory: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllCategories: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getSingleCategory: (id: string) => Promise<({
        medicines: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            description: string | null;
            price: number;
            stock: number;
            manufacturer: string;
            sellerId: string;
            categoryId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateCategory: (id: string, data: any) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map