import { prisma } from "../../lib/prisma";
const createMedicine = async (data, userId) => {
    const result = await prisma.medicine.create({
        data: {
            ...data,
            sellerId: userId,
        },
    });
    return result;
};
const getAllMedicines = async ({ search, sortBy, sortOrder, page, limit, skip }) => {
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    category: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        });
    }
    const result = await prisma.medicine.findMany({
        take: limit,
        skip,
        where: {
            AND: andConditions,
        },
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = await prisma.medicine.count({
        where: {
            AND: andConditions
        }
    });
    return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
const getSingleMedicine = async (id) => {
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
const updateMedicine = async (id, data) => {
    const result = await prisma.medicine.update({
        where: { id },
        data: data,
    });
    return result;
};
const deleteMedicine = async (id) => {
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
//# sourceMappingURL=medicine.service.js.map