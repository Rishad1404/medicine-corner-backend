import { medicineService } from "./medicine.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
// Create medicine-------------------------------------------------------------------------
const createMedicine = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "Unauthorized",
            });
        }
        const result = await medicineService.createMedicine(req.body, user.id);
        res.status(201).json({
            success: true,
            message: "Medicine created successfully",
            data: result,
        });
    }
    catch (error) {
        next();
    }
};
// Get all medicines------------------------------------------------------------------------
const getAllMedicines = async (req, res, next) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const { sortBy, sortOrder, page, limit, skip } = paginationSortingHelper(req.query);
        const result = await medicineService.getAllMedicines({
            search: searchString,
            sortBy,
            sortOrder,
            page,
            limit,
            skip,
        });
        res.status(200).json({
            success: true,
            message: "Medicines fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const getSingleMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await medicineService.getSingleMedicine(id);
        res.status(200).json({
            success: true,
            message: "Medicine fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const updateMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await medicineService.updateMedicine(id, req.body);
        res.status(200).json({
            success: true,
            message: "Medicine updated successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const deleteMedicine = async (req, res, next) => {
    try {
        const { id } = req.params;
        await medicineService.deleteMedicine(id);
        res.status(200).json({
            success: true,
            message: "Medicine deleted successfully",
            data: null,
        });
    }
    catch (err) {
        next();
    }
};
export const medicineController = {
    createMedicine,
    getAllMedicines,
    getSingleMedicine,
    updateMedicine,
    deleteMedicine,
};
//# sourceMappingURL=medicine.controller.js.map