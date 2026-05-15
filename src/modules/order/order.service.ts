import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const result = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItems = [];

    for (const item of payload.items) {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: item.medicineId,
        },
      });

      if (!medicine) {
        throw new Error("Medicine not found");
      }

      if (medicine.stock < item.quantity) {
        throw new Error("Out of Stock");
      }

      totalAmount += medicine.price * item.quantity;

      await tx.medicine.update({
        where: { id: medicine.id },
        data: { stock: medicine.stock - item.quantity },
      });

      orderItems.push({
        medicineId: medicine.id,
        quantity: item.quantity,
        price: medicine.price,
      });
    }

    const newOrder = await tx.order.create({
      data: {
        customerId: userId,
        totalAmount: totalAmount,
        status: "PLACED",
        shippingAddress: payload.shippingAddress,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });
    return newOrder;
  });
  return result;
};

const getMyAllOrders = async (userId: string) => {
  const result = await prisma.order.findMany({
    where: { customerId: userId },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      customer: { 
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          medicine: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getSingleOrder = async (orderId: string, userId: string) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });

  if (!result || result.customerId !== userId) {
    throw new Error("Order not found or access denied");
  }

  return result;
};

const getCustomerStats = async (userId: string) => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7);
  }).reverse();

  const spendingTrend = await Promise.all(
    last6Months.map(async (month) => {
      const start = new Date(`${month}-01T00:00:00Z`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      const aggregate = await prisma.order.aggregate({
        where: {
          customerId: userId,
          createdAt: { gte: start, lt: end },
          status: { not: "CANCELLED" }
        },
        _sum: { totalAmount: true }
      });

      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        month: monthNames[start.getMonth()],
        amount: aggregate._sum.totalAmount || 0
      };
    })
  );

  const items = await prisma.orderItem.findMany({
    where: { order: { customerId: userId } },
    include: { medicine: { include: { category: true } } }
  });

  const categoryMap: Record<string, number> = {};
  items.forEach(item => {
    const cat = item.medicine.category.name;
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  const totalItems = items.length || 1;
  const categoryData = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    value: Math.round((count / totalItems) * 100)
  })).sort((a, b) => b.value - a.value).slice(0, 4);

  return { spendingTrend, categoryData };
};

export const orderService = {
  createOrder,
  getMyAllOrders,
  getSingleOrder,
  getAllOrders,
  getCustomerStats
};
