import { adminService } from "./admin.service";
const getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role, status } = req.body;
        const result = await adminService.updateUserStatus(id, {
            role,
            status,
        });
        res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
const getStats = async (req, res, next) => {
    try {
        const result = await adminService.getDashboardStats();
        res.status(200).json({
            success: true,
            message: "Dashboard stats fetched successfully",
            data: result,
        });
    }
    catch (err) {
        next();
    }
};
export const adminController = {
    getAllUsers,
    updateUserStatus,
    getStats,
};
//# sourceMappingURL=admin.controller.js.map