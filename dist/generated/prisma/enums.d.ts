export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const OrderStatus: {
    readonly PLACED: "PLACED";
    readonly PROCESSING: "PROCESSING";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map