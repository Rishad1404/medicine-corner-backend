import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { reviewController } from "./review.controller";
const router = express.Router();
router.post("/", auth(UserRole.CUSTOMER), reviewController.addReview);
router.get("/:medicineId", auth(UserRole.CUSTOMER), reviewController.getMedicineReviews);
export const reviewRouter = router;
//# sourceMappingURL=review.router.js.map