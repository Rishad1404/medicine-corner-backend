import { sellerService } from "./seller.service";
const getSellerOrders = async (req, res, next) => {
    try {
        const sellerId = req.user.id;
        const result = await sellerService.getSellerOrders(sellerId);
        res.status(200).json({
            success: true,
            message: "Seller orders fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await sellerService.updateOrderStatus(id, status);
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: result
        });
    }
    catch (err) {
        next();
    }
};
const getSellerStats = async (req, res, next) => {
    try {
        const sellerId = req.user.id;
        const result = await sellerService.getSellerStats(sellerId);
        res.status(200).json({
            success: true,
            message: "Seller stats fetched successfully",
            data: result
        });
    }
    catch (err) {
        next();
    }
};
export const sellerController = {
    getSellerOrders,
    updateOrderStatus,
    getSellerStats
};
//# sourceMappingURL=seller.controller.js.map