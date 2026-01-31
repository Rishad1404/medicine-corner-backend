import { categoryService } from "./category.service";
const createCategory = async (req, res, next) => {
    try {
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next();
    }
};
const getAllCategories = async (req, res, next) => {
    try {
        const result = await categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            message: "Categories fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const getSingleCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categoryService.getSingleCategory(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Category not found",
                data: null
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Category fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await categoryService.updateCategory(id, req.body);
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: null,
        });
    }
    catch (err) {
        next();
    }
};
export const categoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.controller.js.map