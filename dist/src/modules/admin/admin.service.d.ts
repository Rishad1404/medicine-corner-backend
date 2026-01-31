import { UserStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../middlewares/auth";
export declare const adminService: {
    getAllUsers: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        role: string | null;
        status: UserStatus;
        email: string;
    }[]>;
    updateUserStatus: (userId: string, payload: {
        role?: UserRole;
        status?: UserStatus;
    }) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: string | null;
        phone: string | null;
        status: UserStatus;
        email: string;
        image: string | null;
        emailVerified: boolean;
    }>;
    getDashboardStats: () => Promise<{
        totalUsers: number;
        totalMedicines: number;
        totalOrders: number;
        totalRevenue: number;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map