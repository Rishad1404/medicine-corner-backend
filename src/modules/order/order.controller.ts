import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const result = await orderService.createOrder(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    next();
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const result = await orderService.getAllOrders();

  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    data: result,
  });
};

const getMyAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const result = await orderService.getMyAllOrders(userId);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = (req as any).user.id;
    const result = await orderService.getSingleOrder(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      message: "Order details fetched",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

export const orderController = {
  createOrder,
  getMyAllOrders,
  getSingleOrder,
  getAllOrders
};
