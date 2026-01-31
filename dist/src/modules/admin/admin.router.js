import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { adminController } from "./admin.controller";
const router = express.Router();
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus);
router.get("/stats", auth(UserRole.ADMIN), adminController.getStats);
export const adminRouter = router;
//# sourceMappingURL=admin.router.js.map