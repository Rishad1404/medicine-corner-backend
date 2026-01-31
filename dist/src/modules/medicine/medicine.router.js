import express from "express";
import { medicineController } from "./medicine.controller";
const router = express.Router();
// router.post("/", auth(UserRole.CUSTOMER), medicineController.createMedicine);
router.get("/", medicineController.getAllMedicines);
router.get("/:id", medicineController.getSingleMedicine);
// router.patch("/:id", medicineController.updateMedicine);
// router.delete("/:id", medicineController.deleteMedicine);
export const medicineRouter = router;
//# sourceMappingURL=medicine.router.js.map