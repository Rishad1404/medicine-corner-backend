import express, { Router } from "express";
import { categoryController } from "./category.controller";
import auth, { UserRole } from "../../middlewares/auth";


const router = express.Router();

router.post("/",auth(UserRole.ADMIN), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);
router.patch("/:id",auth(UserRole.ADMIN), categoryController.updateCategory);
router.delete("/:id",auth(UserRole.ADMIN), categoryController.deleteCategory);

export const categoryRouter:Router = router;
