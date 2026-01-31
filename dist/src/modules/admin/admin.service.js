import { prisma } from "../../lib/prisma";
const getAllUsers = async () => {
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            status: true
        }
    });
    return result;
};
const updateUserStatus = async (userId, payload) => {
    const result = await prisma.user.update({
        where: { id: userId },
        data: payload
    });
    return result;
};
const getDashboardStats = async () => {
    const totalUsers = await prisma.user.count();
    const totalMedicines = await prisma.medicine.count();
    const totalOrders = await prisma.order.count();
    const revenueData = await prisma.order.aggregate({
        _sum: {
            totalAmount: true
        }
    });
    const totalRevenue = revenueData._sum.totalAmount || 0;
    return {
        totalUsers,
        totalMedicines,
        totalOrders,
        totalRevenue
    };
};
export const adminService = {
    getAllUsers,
    updateUserStatus,
    getDashboardStats
};
//# sourceMappingURL=admin.service.js.map