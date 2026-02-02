import { NextFunction, Request, Response } from "express";
import { sellerService } from "./seller.service";

const getSellerOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).user.id;
    const result = await sellerService.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      message: "Seller orders fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const getSellerMedicines = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const user = (req as any).user;

    const result = await sellerService.getMedicinesBySellerId(user.id);

    res.status(200).json({
      success: true,
      message: "Seller medicines fetched successfully",
      data: result,
    });
  } catch (error:any) {
    next()
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await sellerService.updateOrderStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const getSellerStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const sellerId = (req as any).user.id;
    const result = await sellerService.getSellerStats(sellerId);

    res.status(200).json({
      success: true,
      message: "Seller stats fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

export const sellerController = {
  getSellerOrders,
  updateOrderStatus,
  getSellerMedicines,
  getSellerStats,
};
