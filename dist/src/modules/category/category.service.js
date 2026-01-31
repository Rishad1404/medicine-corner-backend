import { prisma } from "../../lib/prisma";
const createCategory = async (data) => {
    const result = await prisma.category.create({
        data
    });
    return result;
};
const getAllCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
};
const getSingleCategory = async (id) => {
    const result = await prisma.category.findUnique({
        where: {
            id: id
        },
        include: {
            medicines: true
        }
    });
    return result;
};
const updateCategory = async (id, data) => {
    const result = await prisma.category.update({
        where: { id },
        data: data,
    });
    return result;
};
const deleteCategory = async (id) => {
    const result = await prisma.category.delete({
        where: { id },
    });
    return result;
};
export const categoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.service.js.map