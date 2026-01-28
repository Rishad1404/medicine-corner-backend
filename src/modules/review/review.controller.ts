import { Request, Response } from "express";
import { reviewService } from "./review.service";

const addReview = async (req: Request, res: Response) => {
  try {
    const customerId = (req as any).user.id;
    const result = await reviewService.createReview(customerId, req.body);

    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: result,
    });
  } catch (err: any) {
    if (err.message === "Rating must be between 1 and 5") {
      res.status(400).json({ success: false, message: err.message });
    } else {
      res
        .status(500)
        .json({
          success: false,
          message: err.message || "Failed to add review",
        });
    }
  }
};

const getMedicineReviews = async (req: Request, res: Response) => {
  try {
    const { medicineId } = req.params;
    const result = await reviewService.getReviewsForMedicine(medicineId as string);
    
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: "Error fetching reviews" });
  }
};

export const reviewController={
    addReview,
    getMedicineReviews
}
