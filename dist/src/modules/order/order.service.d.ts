export declare const orderService: {
    createOrder: (userId: string, payload: any) => Promise<{
        items: {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums").OrderStatus;
        totalAmount: number;
        shippingAddress: string;
        customerId: string;
    }>;
    getMyAllOrders: (userId: string) => Promise<({
        items: ({
            medicine: {
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
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums").OrderStatus;
        totalAmount: number;
        shippingAddress: string;
        customerId: string;
    })[]>;
    getSingleOrder: (orderId: string, userId: string) => Promise<{
        items: ({
            medicine: {
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
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums").OrderStatus;
        totalAmount: number;
        shippingAddress: string;
        customerId: string;
    }>;
};
//# sourceMappingURL=order.service.d.ts.map