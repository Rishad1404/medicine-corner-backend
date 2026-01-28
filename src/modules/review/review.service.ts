import { prisma } from "../../lib/prisma";

interface ReviewPayload {
    medicineId: string;
    rating: number;
    comment: string;
}

const createReview = async (
  customerId: string,
  payload: ReviewPayload
) => {

  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }


  const medicine = await prisma.medicine.findUnique({
    where: { id: payload.medicineId },
  });

  if (!medicine) {
    throw new Error("Medicine not found");
  }

  const result = await prisma.review.create({
    data: {
      customerId: customerId,
      medicineId: payload.medicineId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return result;
};


const getReviewsForMedicine = async (medicineId: string) => {
  const result = await prisma.review.findMany({
    where: { medicineId: medicineId },
    include: {
      customer: {
        select: { 
          name: true,
        } 
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};

export const reviewService={
    createReview,
    getReviewsForMedicine
}
