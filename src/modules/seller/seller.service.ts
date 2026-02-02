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
    },
  });

  const totalRevenue = mySoldItems.reduce((acc, item) => {
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

  return {
    totalMedicines,
    totalOrders,
    totalRevenue,
    pendingOrders,
  };
};

export const sellerService = {
  getSellerOrders,
  getMedicinesBySellerId,
  updateOrderStatus,
  getSellerStats,
};
