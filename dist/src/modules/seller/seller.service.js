import { prisma } from "../../lib/prisma";
const getSellerOrders = async (sellerId) => {
    const result = await prisma.order.findMany({
        where: {
            items: {
                some: {
                    medicine: {
                        sellerId: sellerId,
                    },
                },
            },
        },
        include: {
            items: {
                include: {
                    medicine: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return result;
};
const updateOrderStatus = async (orderId, status) => {
    const result = await prisma.order.update({
        where: { id: orderId },
        data: { status: status },
    });
    return result;
};
const getSellerStats = async (sellerId) => {
    const totalMedicines = await prisma.medicine.count({
        where: { sellerId: sellerId },
    });
    const totalOrders = await prisma.order.count({
        where: {
            items: {
                some: {
                    medicine: {
                        sellerId: sellerId
                    }
                }
            }
        }
    });
    const mySoldItems = await prisma.orderItem.findMany({
        where: {
            medicine: {
                sellerId: sellerId
            },
        },
        select: {
            price: true,
            quantity: true
        }
    });
    const totalRevenue = mySoldItems.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);
    const pendingOrders = await prisma.order.count({
        where: {
            status: "PLACED",
            items: {
                some: {
                    medicine: {
                        sellerId: sellerId
                    }
                }
            }
        }
    });
    return {
        totalMedicines,
        totalOrders,
        totalRevenue,
        pendingOrders
    };
};
export const sellerService = {
    getSellerOrders,
    updateOrderStatus,
    getSellerStats
};
//# sourceMappingURL=seller.service.js.map