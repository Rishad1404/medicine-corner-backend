import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory=async(data:Omit <Category, "id" | "createdAt" | "updatedAt">)=>{
    const result=await prisma.category.create({
        data
    })
    return result;
}

const getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      image: true, 
      _count: {
        select: {
          medicines: true, 
        },
      },
    },
  });
  return result;
};

const getSingleCategory = async (id: string) => {
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


const updateCategory= async (id: string, data: any) => {
  const result = await prisma.category.update({
    where: { id },
    data: data,
  });
  return result;
};


const deleteCategory = async (id: string) => {
  const result = await prisma.category.delete({
    where: { id },
  });
  return result;
};

export const categoryService={
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory
}