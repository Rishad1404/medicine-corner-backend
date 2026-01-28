import express, { Router } from "express"
import auth, { UserRole } from "../../middlewares/auth"
import { medicineController } from "../medicine/medicine.controller"
import { sellerController } from "./seller.controller";

const router=express.Router()

router.post("/medicines",auth(UserRole.SELLER),medicineController.createMedicine);
router.patch("/medicines/:id",auth(UserRole.SELLER),medicineController.updateMedicine);
router.delete("/medicines/:id",auth(UserRole.SELLER),medicineController.deleteMedicine);

router.get("/orders",auth(UserRole.SELLER),sellerController.getSellerOrders);
router.patch("/orders/:id",auth(UserRole.SELLER),sellerController.updateOrderStatus);





export const sellerRouter=router;



