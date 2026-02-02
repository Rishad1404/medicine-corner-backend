import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middlewares/auth";

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      status: true,
    },
  });
  return result;
};

const updateUserStatus = async (
  userId: string,
  payload: { role?: UserRole; status?: UserStatus },
) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });
  return result;
};

const getDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalMedicines = await prisma.medicine.count();
  const totalOrders = await prisma.order.count();

  const revenueData = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  const totalRevenue = revenueData._sum.totalAmount || 0;

  return {
    totalUsers,
    totalMedicines,
    totalOrders,
    totalRevenue,
  };
};

const deleteUser = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getDashboardStats,
  deleteUser,
};
