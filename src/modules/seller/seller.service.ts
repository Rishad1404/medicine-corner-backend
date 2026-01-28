import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"

const getSellerOrders=async(sellerId:string)=>{
    const result=await prisma.order.findMany({
        where:{
            items:{
                some:{
                    medicine:{
                        sellerId:sellerId
                    }
                }
            }
        },
        include:{
            items:{
                include:{
                    medicine:true
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    });
    return result;
}

const updateOrderStatus= async (orderId: string, status: OrderStatus) => {
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status: status }
  });
  return result;
};

export const sellerService={
    getSellerOrders,
    updateOrderStatus
}