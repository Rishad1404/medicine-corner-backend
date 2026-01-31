import { orderService } from "./order.service";
const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await orderService.createOrder(userId, req.body);
        res.status(200).json({
            success: true,
            message: "Order placed successfully",
            data: result,
        });
    }
    catch (error) {
        next();
    }
};
const getMyAllOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await orderService.getMyAllOrders(userId);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result
        });
    }
    catch (err) {
        next();
    }
};
const getSingleOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await orderService.getSingleOrder(req.params.id, userId);
        res.status(200).json({
            success: true,
            message: "Order details fetched",
            data: result
        });
    }
    catch (err) {
        next();
    }
};
export const orderController = {
    createOrder,
    getMyAllOrders,
    getSingleOrder
};
//# sourceMappingURL=order.controller.js.map