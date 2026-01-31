import { NextFunction, Request, Response } from "express";
export declare const medicineController: {
    createMedicine: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getSingleMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=medicine.controller.d.ts.map