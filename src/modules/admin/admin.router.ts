import express from "express";

import auth, { UserRole } from "../../middlewares/auth";
import { adminController } from "./admin.controller";
import { orderController } from "../order/order.controller";
import { sellerController } from "../seller/seller.controller";

const router=express.Router();

router.get("/users",auth(UserRole.ADMIN),adminController.getAllUsers)
router.patch("/users/:id",auth(UserRole.ADMIN),adminController.updateUserStatus)
router.get("/stats",auth(UserRole.ADMIN),adminController.getStats)
router.delete("/users/:id",auth(UserRole.ADMIN),adminController.deleteUser);
router.get("/orders",auth(UserRole.ADMIN),orderController.getAllOrders);
router.patch("/orders/:id",auth(UserRole.ADMIN),sellerController.updateOrderStatus);

export const adminRouter=router