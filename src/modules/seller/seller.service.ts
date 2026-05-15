import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getSellerOrders = async (sellerId: string) => {
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
      customer: {
        select: {
          name: true,
          email: true,
          image:true
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status: status },
  });
  return result;
};

const getMedicinesBySellerId = async (sellerId: string) => {
  const result = await prisma.medicine.findMany({
    where: {
      sellerId: sellerId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSellerStats = async (sellerId: string) => {
  const seller = await prisma.user.findUnique({
    where: { id: sellerId }
  });

  if (!seller) {
    throw new Error("Seller profile not found");
  }

  const totalMedicines = await prisma.medicine.count({
    where: { sellerId: sellerId },
  });

  const totalOrders = await prisma.order.count({
    where: {
      items: {
        some: {
          medicine: {
            sellerId: sellerId,
          },
        },
      },
    },
  });

  const mySoldItems = await prisma.orderItem.findMany({
    where: {
      medicine: {
        sellerId: sellerId,
      },
    },
    select: {
      price: true,
      quantity: true,
      order: {
        select: {
          status: true
        }
      }
    },
  });

  const totalRevenue = mySoldItems
    .filter(item => item.order.status !== "CANCELLED")
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

  const pendingOrders = await prisma.order.count({
    where: {
      status: "PLACED",
      items: {
        some: {
          medicine: {
            sellerId: sellerId,
          },
        },
      },
    },
  });

  // Monthly trends for last 6 months
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1); // Set to first day to avoid overflow (e.g. Feb 31)
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7);
  }).reverse();

  const revenueTrend = await Promise.all(
    last6Months.map(async (month) => {
      const start = new Date(`${month}-01T00:00:00Z`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      const items = await prisma.orderItem.findMany({
        where: {
          medicine: { sellerId },
          order: { createdAt: { gte: start, lt: end }, status: { not: "CANCELLED" } }
        },
        select: { price: true, quantity: true }
      });

      const ordersCount = await prisma.order.count({
        where: {
          items: { some: { medicine: { sellerId } } },
          createdAt: { gte: start, lt: end },
          status: { not: "CANCELLED" }
        }
      });

      const sales = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        name: monthNames[start.getMonth()],
        sales,
        orders: ordersCount
      };
    })
  );

  // Top Products
  const products = await prisma.medicine.findMany({
    where: { sellerId },
    include: { _count: { select: { orderItems: true } } },
    orderBy: { orderItems: { _count: "desc" } },
    take: 5
  });

  const topProducts = products.map(p => ({
    name: p.name,
    sales: p._count.orderItems
  }));

  return {
    sellerName: seller.name,
    totalMedicines,
    totalOrders,
    totalRevenue,
    pendingOrders,
    revenueTrend,
    topProducts
  };
};

export const sellerService = {
  getSellerOrders,
  getMedicinesBySellerId,
  updateOrderStatus,
  getSellerStats,
};
