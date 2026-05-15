import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createMedicine = async (data: any, userId: string) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId,
    },
  });
  return result;
};

const getAllMedicines = async ({
  search,
  category,
  minPrice,
  maxPrice,
  manufacturer,
  sortBy,
  sortOrder,
  page,
  limit,
  skip
}: {
  search?: string | undefined;
  category?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  manufacturer?: string | undefined;
  sortBy: string;
  sortOrder: string;
  page:number,
  limit:number,
  skip:number
}) => {
  const andConditions: MedicineWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (category) {
    andConditions.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive",
        },
      },
    });
  }

  if (manufacturer) {
    andConditions.push({
      manufacturer: {
        contains: manufacturer,
        mode: "insensitive",
      },
    });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    andConditions.push({
      price: {
        ...(minPrice !== undefined && !isNaN(minPrice) ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined && !isNaN(maxPrice) ? { lte: maxPrice } : {}),
      },
    });
  }

  const result = await prisma.medicine.findMany({

    take:limit,
    skip,
    where: {
      AND: andConditions.length > 0 ? andConditions : undefined,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total=await prisma.medicine.count({
    where:{
      AND: andConditions.length > 0 ? andConditions : undefined
    }
  })

  return {
    data:result,
    pagination:{
      total,
      page,
      limit,
      totalPages:Math.ceil(total/limit)
    }
  };
};

const getSingleMedicine = async (id: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
  return result;
};

const updateMedicine = async (id: string, data: any) => {
  const result = await prisma.medicine.update({
    where: { id },
    data: data,
  });
  return result;
};

const deleteMedicine = async (id: string) => {
  const result = await prisma.medicine.delete({
    where: { id },
  });
  return result;
};

export const medicineService = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
};
