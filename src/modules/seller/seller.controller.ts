import { Request, Response } from "express";
import { sellerService } from "./seller.service";

const getSellerOrders = async (req: Request, res: Response) => {
  try {
    const sellerId = (req as any).user.id;
    const result = await sellerService.getSellerOrders(sellerId);

    res.status(200).json({
      success: true,
      message: "Seller orders fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};


const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; 

    const result = await sellerService.updateOrderStatus(id as string, status);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

export const sellerController= {
  getSellerOrders,
  updateOrderStatus
};
