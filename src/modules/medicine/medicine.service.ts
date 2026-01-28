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
  sortBy,
  sortOrder,
  page,
  limit,
  skip
}: {
  search?: string | undefined;
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

  const result = await prisma.medicine.findMany({

    take:limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total=await prisma.medicine.count({
    where:{
      AND:andConditions
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
