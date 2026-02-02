import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    const result = await adminService.updateUserStatus(id as string, {
      role,
      status,
    });

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await adminService.getDashboardStats();

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: result,
    });
  } catch (err: any) {
    next();
  }
};

const deleteUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id as string);

    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
      data: null,
    });
  } catch (error) {
    next()
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getStats,
  deleteUser
};
