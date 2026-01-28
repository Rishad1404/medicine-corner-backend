import { Request, Response } from "express";
import { medicineService } from "./medicine.service";


// Create medicine-------------------------------------------------------------------------
const createMedicine = async (req: Request, res: Response) => {
  try {
    const user=req.user;
    if(!user){
      return res.status(400).json({
        error:"Unauthorized",
      })
    }
    const result = await medicineService.createMedicine(req.body, user.id as string);
    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Medicine Creation Failed",
      details: error,
    });
  }
};

// Get all medicines------------------------------------------------------------------------
const getAllMedicines = async (req: Request, res: Response) => {
  try {

    const {search,sortBy,sortOrder}=req.query;
    const searchString=typeof search === 'string' ? search : undefined;
    const sortByString=typeof sortBy === 'string' ? sortBy :'createdAt';
    const sortOrderString=typeof sortOrder ==='string'? sortOrder : 'desc'

    const result = await medicineService.getAllMedicines({search:searchString, sortBy:sortByString, sortOrder: sortOrderString});
    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: err,
    });
  }
};

const getSingleMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await medicineService.getSingleMedicine(id as string);
    res.status(200).json({
      success: true,
      message: "Medicine fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine",
      error: err,
    });
  }
};

const updateMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await medicineService.updateMedicine(id as string, req.body);
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update medicine",
        error: err,
      });
  }
};

const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await medicineService.deleteMedicine(id as string);
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: null,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete medicine",
        error: err,
      });
  }
};

export const medicineController = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
};
