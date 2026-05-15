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

  const revenueDataAggregate = await prisma.order.aggregate({
    where: {
      status: { not: "CANCELLED" },
    },
    _sum: {
      totalAmount: true,
    },
  });

  const totalRevenue = revenueDataAggregate._sum.totalAmount || 0;

  // Get monthly stats for the last 6 months
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7); // YYYY-MM
  }).reverse();

  const monthlyStats = await Promise.all(
    last6Months.map(async (month) => {
      const startOfMonth = new Date(`${month}-01T00:00:00Z`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);

      const revenue = await prisma.order.aggregate({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
          status: { not: 'CANCELLED' },
        },
        _sum: {
          totalAmount: true,
        },
      });

      const orders = await prisma.order.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });

      const users = await prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
        },
      });

      return {
        name: startOfMonth.toLocaleString('default', { month: 'short' }),
        revenue: Number(revenue._sum.totalAmount || 0),
        orders,
        users,
      };
    })
  );

  // Category distribution
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true }
      }
    }
  });

  const categoryDistribution = categories.map(c => ({
    name: c.name,
    value: c._count.medicines
  }));

  return {
    totalUsers,
    totalMedicines,
    totalOrders,
    totalRevenue,
    monthlyStats,
    categoryDistribution
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
