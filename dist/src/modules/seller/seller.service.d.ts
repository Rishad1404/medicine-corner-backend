import { OrderStatus } from "../../../generated/prisma/enums";
export declare const sellerService: {
    getSellerOrders: (sellerId: string) => Promise<({
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
        status: OrderStatus;
        totalAmount: number;
        shippingAddress: string;
        customerId: string;
    })[]>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: OrderStatus;
        totalAmount: number;
        shippingAddress: string;
        customerId: string;
    }>;
    getSellerStats: (sellerId: string) => Promise<{
        totalMedicines: number;
        totalOrders: number;
        totalRevenue: number;
        pendingOrders: number;
    }>;
};
//# sourceMappingURL=seller.service.d.ts.map