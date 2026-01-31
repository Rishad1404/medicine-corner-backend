import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { orderController } from "./order.controller";
import { sellerController } from "../seller/seller.controller";
const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), orderController.createOrder);
router.get("/", auth(UserRole.CUSTOMER), orderController.getMyAllOrders);
router.get("/:id", auth(UserRole.CUSTOMER), orderController.getSingleOrder);
router.get("/orders", auth(UserRole.SELLER), sellerController.getSellerOrders);
router.patch("/orders/:id", auth(UserRole.SELLER), sellerController.updateOrderStatus);
export const orderRouter = router;
//# sourceMappingURL=order.router.js.map