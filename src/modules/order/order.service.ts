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

export const orderService = {
  createOrder,
  getMyAllOrders,
  getSingleOrder,
  getAllOrders,
};
