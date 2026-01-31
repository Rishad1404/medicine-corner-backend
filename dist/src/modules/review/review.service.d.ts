interface ReviewPayload {
    medicineId: string;
    rating: number;
    comment: string;
}
export declare const reviewService: {
    createReview: (customerId: string, payload: ReviewPayload) => Promise<{
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        rating: number;
        comment: string | null;
    }>;
    getReviewsForMedicine: (medicineId: string) => Promise<({
        customer: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        rating: number;
        comment: string | null;
    })[]>;
};
export {};
//# sourceMappingURL=review.service.d.ts.map