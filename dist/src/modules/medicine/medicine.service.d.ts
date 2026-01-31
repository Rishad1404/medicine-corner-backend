export declare const medicineService: {
    createMedicine: (data: any, userId: string) => Promise<{
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
    }>;
    getAllMedicines: ({ search, sortBy, sortOrder, page, limit, skip }: {
        search?: string | undefined;
        sortBy: string;
        sortOrder: string;
        page: number;
        limit: number;
        skip: number;
    }) => Promise<{
        data: {
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
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSingleMedicine: (id: string) => Promise<({
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
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
    }) | null>;
    updateMedicine: (id: string, data: any) => Promise<{
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
    }>;
    deleteMedicine: (id: string) => Promise<{
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
    }>;
};
//# sourceMappingURL=medicine.service.d.ts.map