var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/server.ts
import "dotenv/config";

// src/app.ts
import express7 from "express";

// src/modules/category/category.router.ts
import express from "express";

// src/lib/prisma.ts
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum UserStatus {\n  ACTIVE\n  BLOCKED\n}\n\nmodel User {\n  id            String   @id\n  name          String\n  email         String\n  emailVerified Boolean  @default(false)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  orders   Order[]\n  sessions Session[]\n  accounts Account[]\n  reviews  Review[]\n\n  role   String?    @default("CUSTOMER")\n  phone  String?\n  status UserStatus @default(ACTIVE)\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique @db.VarChar(100)\n  medicines Medicine[]\n  image     String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String  @db.VarChar(150)\n  description  String? @db.Text\n  price        Int\n  stock        Int\n  manufacturer String  @db.VarChar(100)\n\n  categoryId String\n  category   Category  @relation(fields: [categoryId], references: [id])\n  image      String?\n  expiryDate DateTime?\n\n  sellerId String\n\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([categoryId])\n  @@map("medicines")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  totalAmount     Int\n  status          OrderStatus @default(PLACED)\n  shippingAddress String      @db.Text\n\n  customerId String\n  customer   User   @relation(fields: [customerId], references: [id])\n\n  items OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id         String   @id @default(uuid())\n  quantity   Int\n  price      Int\n  orderId    String\n  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int      @default(5)\n  comment    String?  @db.Text\n  customerId String\n  customer   User     @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  createdAt  DateTime @default(now())\n\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"image","kind":"scalar","type":"String"},{"name":"expiryDate","kind":"scalar","type":"DateTime"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  MedicineScalarFieldEnum: () => MedicineScalarFieldEnum,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  OrderItemScalarFieldEnum: () => OrderItemScalarFieldEnum,
  OrderScalarFieldEnum: () => OrderScalarFieldEnum,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Category: "Category",
  Medicine: "Medicine",
  Order: "Order",
  OrderItem: "OrderItem",
  Review: "Review"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var MedicineScalarFieldEnum = {
  id: "id",
  name: "name",
  description: "description",
  price: "price",
  stock: "stock",
  manufacturer: "manufacturer",
  categoryId: "categoryId",
  image: "image",
  expiryDate: "expiryDate",
  sellerId: "sellerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderScalarFieldEnum = {
  id: "id",
  totalAmount: "totalAmount",
  status: "status",
  shippingAddress: "shippingAddress",
  customerId: "customerId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var OrderItemScalarFieldEnum = {
  id: "id",
  quantity: "quantity",
  price: "price",
  orderId: "orderId",
  medicineId: "medicineId"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  customerId: "customerId",
  medicineId: "medicineId",
  createdAt: "createdAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}
var pool = new Pool({ connectionString });
var adapter = new PrismaPg(pool);
var prisma = new PrismaClient({ adapter });

// src/modules/category/category.service.ts
var createCategory = async (data) => {
  const result = await prisma.category.create({
    data
  });
  return result;
};
var getAllCategories = async () => {
  const result = await prisma.category.findMany({
    orderBy: {
      name: "asc"
    },
    select: {
      id: true,
      name: true,
      image: true,
      _count: {
        select: {
          medicines: true
        }
      }
    }
  });
  return result;
};
var getSingleCategory = async (id) => {
  const result = await prisma.category.findUnique({
    where: {
      id
    },
    include: {
      medicines: true
    }
  });
  return result;
};
var updateCategory = async (id, data) => {
  const result = await prisma.category.update({
    where: { id },
    data
  });
  return result;
};
var deleteCategory = async (id) => {
  const result = await prisma.category.delete({
    where: { id }
  });
  return result;
};
var categoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllCategories2 = async (req, res, next) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var getSingleCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.getSingleCategory(id);
    if (!result) {
      res.status(404).json({
        success: false,
        message: "Category not found",
        data: null
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.updateCategory(id, req.body);
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: null
    });
  } catch (err) {
    next();
  }
};
var categoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  getSingleCategory: getSingleCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: (process.env.BETTER_AUTH_URL || "http://localhost:5000") + "/api/auth",
  trustedOrigins: [process.env.APP_URL, process.env.PROD_APP_URL].filter(Boolean),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true
    // autoSignIn: false,
    // requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
  }
});

// src/middlewares/auth.ts
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized"
        });
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var auth_default = auth2;

// src/modules/category/category.router.ts
var router = express.Router();
router.post("/", auth_default("ADMIN" /* ADMIN */), categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);
router.patch("/:id", auth_default("ADMIN" /* ADMIN */), categoryController.updateCategory);
router.delete("/:id", auth_default("ADMIN" /* ADMIN */), categoryController.deleteCategory);
var categoryRouter = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/medicine/medicine.router.ts
import express2 from "express";

// src/modules/medicine/medicine.service.ts
var createMedicine = async (data, userId) => {
  const result = await prisma.medicine.create({
    data: {
      ...data,
      sellerId: userId
    }
  });
  return result;
};
var getAllMedicines = async ({
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
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          category: {
            name: {
              contains: search,
              mode: "insensitive"
            }
          }
        }
      ]
    });
  }
  if (category) {
    andConditions.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive"
        }
      }
    });
  }
  if (manufacturer) {
    andConditions.push({
      manufacturer: {
        contains: manufacturer,
        mode: "insensitive"
      }
    });
  }
  if (minPrice !== void 0 || maxPrice !== void 0) {
    andConditions.push({
      price: {
        ...minPrice !== void 0 && !isNaN(minPrice) ? { gte: minPrice } : {},
        ...maxPrice !== void 0 && !isNaN(maxPrice) ? { lte: maxPrice } : {}
      }
    });
  }
  const result = await prisma.medicine.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions.length > 0 ? andConditions : void 0
    },
    orderBy: {
      [sortBy]: sortOrder
    }
  });
  const total = await prisma.medicine.count({
    where: {
      AND: andConditions.length > 0 ? andConditions : void 0
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
var getSingleMedicine = async (id) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id
    },
    include: {
      category: true
    }
  });
  return result;
};
var updateMedicine = async (id, data) => {
  const result = await prisma.medicine.update({
    where: { id },
    data
  });
  return result;
};
var deleteMedicine = async (id) => {
  const result = await prisma.medicine.delete({
    where: { id }
  });
  return result;
};
var medicineService = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine
};

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/medicine/medicine.controller.ts
var createMedicine2 = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized"
      });
    }
    const result = await medicineService.createMedicine(
      req.body,
      user.id
    );
    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      data: result
    });
  } catch (error) {
    next();
  }
};
var getAllMedicines2 = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, manufacturer } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const { sortBy, sortOrder, page, limit, skip } = paginationSortingHelper_default(
      req.query
    );
    const result = await medicineService.getAllMedicines({
      search: searchString,
      category: typeof category === "string" ? category : void 0,
      minPrice: typeof minPrice === "string" ? Number(minPrice) : void 0,
      maxPrice: typeof maxPrice === "string" ? Number(maxPrice) : void 0,
      manufacturer: typeof manufacturer === "string" ? manufacturer : void 0,
      sortBy,
      sortOrder,
      page,
      limit,
      skip
    });
    res.status(200).json({
      success: true,
      message: "Medicines fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var getSingleMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await medicineService.getSingleMedicine(id);
    res.status(200).json({
      success: true,
      message: "Medicine fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var updateMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await medicineService.updateMedicine(id, req.body);
    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var deleteMedicine2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await medicineService.deleteMedicine(id);
    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
      data: null
    });
  } catch (err) {
    next();
  }
};
var medicineController = {
  createMedicine: createMedicine2,
  getAllMedicines: getAllMedicines2,
  getSingleMedicine: getSingleMedicine2,
  updateMedicine: updateMedicine2,
  deleteMedicine: deleteMedicine2
};

// src/modules/medicine/medicine.router.ts
var router2 = express2.Router();
router2.get("/", medicineController.getAllMedicines);
router2.get("/:id", medicineController.getSingleMedicine);
var medicineRouter = router2;

// src/modules/order/order.router.ts
import express3 from "express";

// src/modules/order/order.service.ts
var createOrder = async (userId, payload) => {
  const result = await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    const orderItems = [];
    for (const item of payload.items) {
      const medicine = await tx.medicine.findUnique({
        where: {
          id: item.medicineId
        }
      });
      if (!medicine) {
        throw new Error("Medicine not found");
      }
      if (medicine.stock < item.quantity) {
        throw new Error("Out of Stock");
      }
      totalAmount += medicine.price * item.quantity;
      await tx.medicine.update({
        where: { id: medicine.id },
        data: { stock: medicine.stock - item.quantity }
      });
      orderItems.push({
        medicineId: medicine.id,
        quantity: item.quantity,
        price: medicine.price
      });
    }
    const newOrder = await tx.order.create({
      data: {
        customerId: userId,
        totalAmount,
        status: "PLACED",
        shippingAddress: payload.shippingAddress,
        items: {
          create: orderItems
        }
      },
      include: {
        items: true
      }
    });
    return newOrder;
  });
  return result;
};
var getMyAllOrders = async (userId) => {
  const result = await prisma.order.findMany({
    where: { customerId: userId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var getAllOrders = async () => {
  const result = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          name: true,
          email: true
        }
      },
      items: {
        include: {
          medicine: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var getSingleOrder = async (orderId, userId) => {
  const result = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          medicine: true
        }
      }
    }
  });
  if (!result || result.customerId !== userId) {
    throw new Error("Order not found or access denied");
  }
  return result;
};
var getCustomerStats = async (userId) => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7);
  }).reverse();
  const spendingTrend = await Promise.all(
    last6Months.map(async (month) => {
      const start = /* @__PURE__ */ new Date(`${month}-01T00:00:00Z`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const aggregate = await prisma.order.aggregate({
        where: {
          customerId: userId,
          createdAt: { gte: start, lt: end },
          status: { not: "CANCELLED" }
        },
        _sum: { totalAmount: true }
      });
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        month: monthNames[start.getMonth()],
        amount: aggregate._sum.totalAmount || 0
      };
    })
  );
  const items = await prisma.orderItem.findMany({
    where: { order: { customerId: userId } },
    include: { medicine: { include: { category: true } } }
  });
  const categoryMap = {};
  items.forEach((item) => {
    const cat = item.medicine.category.name;
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const totalItems = items.length || 1;
  const categoryData = Object.entries(categoryMap).map(([name, count]) => ({
    name,
    value: Math.round(count / totalItems * 100)
  })).sort((a, b) => b.value - a.value).slice(0, 4);
  return { spendingTrend, categoryData };
};
var orderService = {
  createOrder,
  getMyAllOrders,
  getSingleOrder,
  getAllOrders,
  getCustomerStats
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderService.createOrder(userId, req.body);
    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var getAllOrders2 = async (req, res) => {
  const result = await orderService.getAllOrders();
  res.status(200).json({
    success: true,
    message: "Order placed successfully",
    data: result
  });
};
var getMyAllOrders2 = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderService.getMyAllOrders(userId);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var getSingleOrder2 = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderService.getSingleOrder(
      req.params.id,
      userId
    );
    res.status(200).json({
      success: true,
      message: "Order details fetched",
      data: result
    });
  } catch (err) {
    next();
  }
};
var getCustomerStats2 = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await orderService.getCustomerStats(userId);
    res.status(200).json({
      success: true,
      message: "Customer stats fetched",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var orderController = {
  createOrder: createOrder2,
  getMyAllOrders: getMyAllOrders2,
  getSingleOrder: getSingleOrder2,
  getAllOrders: getAllOrders2,
  getCustomerStats: getCustomerStats2
};

// src/modules/seller/seller.service.ts
var getSellerOrders = async (sellerId) => {
  const result = await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId
          }
        }
      }
    },
    include: {
      items: {
        include: {
          medicine: true
        }
      },
      customer: {
        select: {
          name: true,
          email: true,
          image: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var updateOrderStatus = async (orderId, status) => {
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  return result;
};
var getMedicinesBySellerId = async (sellerId) => {
  const result = await prisma.medicine.findMany({
    where: {
      sellerId
    },
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return result;
};
var getSellerStats = async (sellerId) => {
  const seller = await prisma.user.findUnique({
    where: { id: sellerId }
  });
  if (!seller) {
    throw new Error("Seller profile not found");
  }
  const totalMedicines = await prisma.medicine.count({
    where: { sellerId }
  });
  const totalOrders = await prisma.order.count({
    where: {
      items: {
        some: {
          medicine: {
            sellerId
          }
        }
      }
    }
  });
  const mySoldItems = await prisma.orderItem.findMany({
    where: {
      medicine: {
        sellerId
      }
    },
    select: {
      price: true,
      quantity: true,
      order: {
        select: {
          status: true
        }
      }
    }
  });
  const totalRevenue = mySoldItems.filter((item) => item.order.status !== "CANCELLED").reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const pendingOrders = await prisma.order.count({
    where: {
      status: "PLACED",
      items: {
        some: {
          medicine: {
            sellerId
          }
        }
      }
    }
  });
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7);
  }).reverse();
  const revenueTrend = await Promise.all(
    last6Months.map(async (month) => {
      const start = /* @__PURE__ */ new Date(`${month}-01T00:00:00Z`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      const items = await prisma.orderItem.findMany({
        where: {
          medicine: { sellerId },
          order: { createdAt: { gte: start, lt: end }, status: { not: "CANCELLED" } }
        },
        select: { price: true, quantity: true }
      });
      const ordersCount = await prisma.order.count({
        where: {
          items: { some: { medicine: { sellerId } } },
          createdAt: { gte: start, lt: end },
          status: { not: "CANCELLED" }
        }
      });
      const sales = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return {
        name: monthNames[start.getMonth()],
        sales,
        orders: ordersCount
      };
    })
  );
  const products = await prisma.medicine.findMany({
    where: { sellerId },
    include: { _count: { select: { orderItems: true } } },
    orderBy: { orderItems: { _count: "desc" } },
    take: 5
  });
  const topProducts = products.map((p) => ({
    name: p.name,
    sales: p._count.orderItems
  }));
  return {
    sellerName: seller.name,
    totalMedicines,
    totalOrders,
    totalRevenue,
    pendingOrders,
    revenueTrend,
    topProducts
  };
};
var sellerService = {
  getSellerOrders,
  getMedicinesBySellerId,
  updateOrderStatus,
  getSellerStats
};

// src/modules/seller/seller.controller.ts
var getSellerOrders2 = async (req, res, next) => {
  try {
    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: seller not found"
      });
    }
    const result = await sellerService.getSellerOrders(sellerId);
    res.status(200).json({
      success: true,
      message: "Seller orders fetched successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getSellerMedicines = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await sellerService.getMedicinesBySellerId(user.id);
    res.status(200).json({
      success: true,
      message: "Seller medicines fetched successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateOrderStatus2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await sellerService.updateOrderStatus(id, status);
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var getSellerStats2 = async (req, res, next) => {
  try {
    const sellerId = req.user.id;
    const result = await sellerService.getSellerStats(sellerId);
    res.status(200).json({
      success: true,
      message: "Seller stats fetched successfully",
      data: result
    });
  } catch (err) {
    next(err);
  }
};
var sellerController = {
  getSellerOrders: getSellerOrders2,
  updateOrderStatus: updateOrderStatus2,
  getSellerMedicines,
  getSellerStats: getSellerStats2
};

// src/modules/order/order.router.ts
var router3 = express3.Router();
router3.post("/", auth_default("CUSTOMER" /* CUSTOMER */, "SELLER" /* SELLER */), orderController.createOrder);
router3.get("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getMyAllOrders);
router3.get("/customer-stats", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getCustomerStats);
router3.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getSingleOrder);
router3.get("/orders", auth_default("SELLER" /* SELLER */), sellerController.getSellerOrders);
router3.patch("/orders/:id", auth_default("SELLER" /* SELLER */), sellerController.updateOrderStatus);
var orderRouter = router3;

// src/modules/seller/seller.router.ts
import express4 from "express";
var router4 = express4.Router();
router4.post("/medicines", auth_default("SELLER" /* SELLER */), medicineController.createMedicine);
router4.patch("/medicines/:id", auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), medicineController.updateMedicine);
router4.delete("/medicines/:id", auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), medicineController.deleteMedicine);
router4.get("/orders", auth_default("SELLER" /* SELLER */), sellerController.getSellerOrders);
router4.patch("/orders/:id", auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), sellerController.updateOrderStatus);
router4.get("/stats", auth_default("SELLER" /* SELLER */), sellerController.getSellerStats);
router4.get("/medicines", auth_default("SELLER" /* SELLER */, "ADMIN" /* ADMIN */), sellerController.getSellerMedicines);
var sellerRouter = router4;

// src/modules/admin/admin.router.ts
import express5 from "express";

// src/modules/admin/admin.service.ts
var getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      status: true
    }
  });
  return result;
};
var updateUserStatus = async (userId, payload) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: payload
  });
  return result;
};
var getDashboardStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalMedicines = await prisma.medicine.count();
  const totalOrders = await prisma.order.count();
  const revenueDataAggregate = await prisma.order.aggregate({
    where: {
      status: { not: "CANCELLED" }
    },
    _sum: {
      totalAmount: true
    }
  });
  const totalRevenue = revenueDataAggregate._sum.totalAmount || 0;
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setMonth(d.getMonth() - i);
    return d.toISOString().substring(0, 7);
  }).reverse();
  const monthlyStats = await Promise.all(
    last6Months.map(async (month) => {
      const startOfMonth = /* @__PURE__ */ new Date(`${month}-01T00:00:00Z`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      const revenue = await prisma.order.aggregate({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth
          },
          status: { not: "CANCELLED" }
        },
        _sum: {
          totalAmount: true
        }
      });
      const orders = await prisma.order.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth
          }
        }
      });
      const users = await prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth
          }
        }
      });
      return {
        name: startOfMonth.toLocaleString("default", { month: "short" }),
        revenue: Number(revenue._sum.totalAmount || 0),
        orders,
        users
      };
    })
  );
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { medicines: true }
      }
    }
  });
  const categoryDistribution = categories.map((c) => ({
    name: c.name,
    value: c._count.medicines
  }));
  return {
    totalUsers,
    totalMedicines,
    totalOrders,
    totalRevenue,
    monthlyStats,
    categoryDistribution
  };
};
var deleteUser = async (id) => {
  const result = await prisma.user.delete({
    where: { id }
  });
  return result;
};
var adminService = {
  getAllUsers,
  updateUserStatus,
  getDashboardStats,
  deleteUser
};

// src/modules/admin/admin.controller.ts
var getAllUsers2 = async (req, res, next) => {
  try {
    const result = await adminService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var updateUserStatus2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;
    const result = await adminService.updateUserStatus(id, {
      role,
      status
    });
    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var getStats = async (req, res, next) => {
  try {
    const result = await adminService.getDashboardStats();
    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var deleteUser2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
      data: null
    });
  } catch (error) {
    next();
  }
};
var adminController = {
  getAllUsers: getAllUsers2,
  updateUserStatus: updateUserStatus2,
  getStats,
  deleteUser: deleteUser2
};

// src/modules/admin/admin.router.ts
var router5 = express5.Router();
router5.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
router5.patch("/users/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
router5.get("/stats", auth_default("ADMIN" /* ADMIN */), adminController.getStats);
router5.delete("/users/:id", auth_default("ADMIN" /* ADMIN */), adminController.deleteUser);
router5.get("/orders", auth_default("ADMIN" /* ADMIN */), orderController.getAllOrders);
router5.patch("/orders/:id", auth_default("ADMIN" /* ADMIN */), sellerController.updateOrderStatus);
var adminRouter = router5;

// src/modules/review/review.router.ts
import express6 from "express";

// src/modules/review/review.service.ts
var createReview = async (customerId, payload) => {
  if (payload.rating < 1 || payload.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  const hasPurchased = await prisma.order.findFirst({
    where: {
      customerId,
      status: "DELIVERED",
      items: {
        some: {
          medicineId: payload.medicineId
        }
      }
    }
  });
  if (!hasPurchased) {
    throw new Error("You can only review medicines you have purchased and received.");
  }
  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      medicineId: payload.medicineId
    }
  });
  if (existingReview) {
    throw new Error("You have already reviewed this medicine.");
  }
  const result = await prisma.review.create({
    data: {
      customerId,
      medicineId: payload.medicineId,
      rating: payload.rating,
      comment: payload.comment
    }
  });
  return result;
};
var getReviewsForMedicine = async (medicineId) => {
  const result = await prisma.review.findMany({
    where: { medicineId },
    include: {
      customer: {
        select: {
          name: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
  return result;
};
var reviewService = {
  createReview,
  getReviewsForMedicine
};

// src/modules/review/review.controller.ts
var addReview = async (req, res, next) => {
  try {
    const customerId = req.user.id;
    const result = await reviewService.createReview(customerId, req.body);
    res.status(200).json({
      success: true,
      message: "Review added successfully",
      data: result
    });
  } catch (err) {
    if (err.message === "Rating must be between 1 and 5") {
      res.status(400).json({ success: false, message: err.message });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Failed to add review"
      });
    }
  }
};
var getMedicineReviews = async (req, res, next) => {
  try {
    const { medicineId } = req.params;
    const result = await reviewService.getReviewsForMedicine(medicineId);
    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: result
    });
  } catch (err) {
    next();
  }
};
var reviewController = {
  addReview,
  getMedicineReviews
};

// src/modules/review/review.router.ts
var router6 = express6.Router();
router6.post("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.addReview);
router6.get("/:medicineId", reviewController.getMedicineReviews);
var reviewRouter = router6;

// src/modules/rag/rag.route.ts
import { Router as Router3 } from "express";

// src/modules/rag/embedding.service.ts
var EmbeddingService = class {
  apiKey;
  apiUrl = "https://openrouter.ai/api/v1";
  embeddingModel;
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    this.embeddingModel = process.env.OPENROUTER_EMBEDDING_MODEL || "nvidia/llama-nemotron-embed-vl-1b-v2:free";
    if (!this.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not defined");
    }
  }
  async generateEmbedding(text) {
    try {
      const response = await fetch(`${this.apiUrl}/embeddings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: text,
          model: this.embeddingModel
        })
      });
      if (!response.ok) {
        throw new Error(`OpenRouter API returned ${response.status}`);
      }
      const data = await response.json();
      if (!data.data || data.data.length == 0) {
        throw new Error("No embedding data returned from OpenRouter API");
      }
      return data.data[0].embedding;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

// src/modules/rag/indexing.service.ts
var toVectorLiteral = (vector) => `[${vector.join(",")}]`;
var IndexingService = class {
  embeddingService;
  constructor() {
    this.embeddingService = new EmbeddingService();
  }
  async indexDocument(chunkKey, sourceType, sourceId, content, sourceLabel, metaData) {
    try {
      const embedding = await this.embeddingService.generateEmbedding(content);
      const vectorLiteral = toVectorLiteral(embedding);
      await prisma.$executeRaw(prismaNamespace_exports.sql`
                
                INSERT INTO "document_embeddings" 
                (
                    "id",
                    "chunkKey",
                    "sourceType",
                    "sourceId",
                    "sourceLabel",
                    "content",
                    "metaData",
                    "embedding",
                    "deletedAt",
                    "updatedAt"
                )
                VALUES 
                (
                    ${prismaNamespace_exports.raw("gen_random_uuid()")},
                    ${chunkKey},
                    ${sourceType},
                    ${sourceId},
                    ${sourceLabel || null},
                    ${content},
                    ${JSON.stringify(metaData || {})}::jsonb,
                    ${prismaNamespace_exports.raw(`'${vectorLiteral}'::vector`)},
          ${prismaNamespace_exports.raw("NOW()")},
          NOW()
                ) 
                ON CONFLICT ("chunkKey") 
                DO UPDATE SET 
                    "sourceType" = EXCLUDED."sourceType",
                    "sourceId" = EXCLUDED."sourceId",
                    "sourceLabel" = EXCLUDED."sourceLabel",
                    "content" = EXCLUDED."content",
                    "metaData" = EXCLUDED."metaData",
                    "embedding" = EXCLUDED."embedding",
                    "isDeleted" = false,
                    "deletedAt" = "document_embeddings"."deletedAt",
                    "updatedAt" = NOW();
            `);
    } catch (error) {
      console.log(error);
    }
  }
  async indexMedicinesData() {
    try {
      console.log("Fetching Medicine data for indexing");
      const medicines = await prisma.medicine.findMany({
        where: {
          stock: {
            gt: 0
          }
        },
        select: {
          id: true,
          name: true,
          description: true,
          category: true,
          reviews: {
            select: {
              rating: true
            }
          }
        }
      });
      let indexedCount = 0;
      for (const medicine of medicines) {
        const categoryName = medicine.category.name;
        const reviewsList = medicine.reviews.map(
          (review) => `-Rating: ${review.rating}/5. || "No Review Available"`
        ).join("\n");
        const content = `Medicine Name: ${medicine.name}
                        Category: ${categoryName}
                        Description: ${medicine.description}
                        Reviews: ${reviewsList}`;
        const metaData = {
          medicineId: medicine.id,
          name: medicine.name,
          description: medicine.description,
          category: categoryName
        };
        const chunkKey = `medicine-${medicine.id}`;
        await this.indexDocument(
          chunkKey,
          "MEDICINE",
          medicine.id,
          content,
          medicine.name,
          metaData
        );
        indexedCount++;
      }
      console.log(`Successfully Indexed ${indexedCount} medicines `);
      return {
        success: true,
        message: `Successfully Indexed ${indexedCount} medicines `,
        indexedCount
      };
    } catch (error) {
      console.log(error);
    }
  }
};

// src/modules/rag/llm.service.ts
var LLMService = class {
  apiKey;
  apiUrl = "https://openrouter.ai/api/v1";
  model;
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "", this.model = process.env.OPENROUTER_LLM_MODEL || "nvidia/nemotron-3-super-120b-a12b:free";
    if (!this.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not defined");
    }
  }
  async generateResponse(prompt, context = [], asJson = false) {
    try {
      let fullPrompt = context.length > 0 ? `Context information:
${context.join("\n\n")}

Question: ${prompt}

Answer based on the context above.` : prompt;
      if (asJson) {
        fullPrompt += `

Return ONLY a valid JSON object matching this structure: 
        {
          "summary": "A brief overall summary or advice",
          "medicines": [
            {
              "name": "Exact Medicine Name",
              "reason": "Specific reason why this is recommended based on the provided context",
              "category": "Category of the medicine"
            }
          ]
        }. 
        Do not include any markdown formatting like \`\`\`json. Respond with ONLY the raw JSON string.`;
      }
      const systemMessage = asJson ? "You are a helpful assistant for Medicine Corner, a pharmacy management system. Answer questions based on the provided context. You MUST respond with ONLY valid JSON format. Do not include markdown tags." : "You are a helpful assistant for Medicine Corner, a pharmacy management system. Answer questions based on the provided context. If the context does not contain the answer, say you don't have enough information.";
      const bodyPayload = {
        model: this.model,
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user",
            content: fullPrompt
          }
        ],
        temperature: 0.1,
        // Lower temperature for more deterministic JSON
        max_tokens: 1500
      };
      const response = await fetch(`${this.apiUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://medicine-corner.vercel.app",
          "X-Title": "Medicine Corner"
        },
        body: JSON.stringify(bodyPayload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `OpenRouter API error: ${response.status} - ${errorData.error?.message || "unknown error"}`
        );
      }
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating LLM response:", error);
      throw error;
    }
  }
};

// src/modules/rag/rag.service.ts
var RAGService = class {
  embeddingService;
  llmService;
  indexingService;
  constructor() {
    this.embeddingService = new EmbeddingService();
    this.indexingService = new IndexingService();
    this.llmService = new LLMService();
  }
  async ingestMedicinesData() {
    return this.indexingService.indexMedicinesData();
  }
  async retrieveRelevantDocuments(query, limit = 10, sourceType) {
    try {
      const queryEmbedding = await this.embeddingService.generateEmbedding(query);
      const vectorLiteral = `[${queryEmbedding.join(",")}]`;
      const results = await prisma.$queryRaw(prismaNamespace_exports.sql`
                SELECT "id", "chunkKey", "sourceType", "sourceId", "sourceLabel", "content", "metaData", "embedding", "isDeleted", "createdAt", "updatedAt", 1 - ("embedding" <=> CAST(${vectorLiteral} AS vector)) as similarity
                FROM "document_embeddings"
                WHERE "isDeleted" = false
                ${sourceType ? prismaNamespace_exports.sql`AND "sourceType" = ${sourceType}` : prismaNamespace_exports.empty}
                ORDER BY "embedding" <=> CAST(${vectorLiteral} AS vector) LIMIT ${limit} 
            `);
      return results;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async generateAnswer(query, limit = 10, sourceType, asJson = false) {
    try {
      const relevantDocs = await this.retrieveRelevantDocuments(
        query,
        limit,
        sourceType
      );
      const context = relevantDocs.filter((doc) => doc.content).map((doc) => doc.content);
      let answer = await this.llmService.generateResponse(
        query,
        context,
        asJson
      );
      let parsedAnswer = answer;
      if (asJson) {
        try {
          if (answer.startsWith("```json")) {
            answer = answer.replace(/```json\n?/, "").replace(/```$/, "").trim();
          } else if (answer.startsWith("```")) {
            answer = answer.replace(/```\n?/, "").replace(/```$/, "").trim();
          }
          parsedAnswer = JSON.parse(answer);
        } catch (e) {
          console.error("Failed to parse LLM JSON response:", e);
          throw e;
        }
      }
      return {
        answer: parsedAnswer,
        sources: relevantDocs.map((doc) => ({
          sourceId: doc.sourceId,
          sourceLabel: doc.sourceLabel,
          similarity: doc.similarity
        }))
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getStats() {
    try {
      const totalDocuments = await prisma.$queryRaw(prismaNamespace_exports.sql`
        SELECT COUNT(*) as count FROM "document_embeddings" WHERE "isDeleted" = false;
        `);
      const sourceTypeCounts = await prisma.$queryRaw(prismaNamespace_exports.sql`
        SELECT "sourceType", COUNT(*) as count FROM "document_embeddings" WHERE "isDeleted" = false GROUP BY "sourceType"
        `);
      return {
        totalActiveDocuments: Number(totalDocuments[0]?.count ?? 0),
        sourceTypeBreakdown: sourceTypeCounts.reduce(
          (acc, curr) => {
            acc[curr.sourceType] = Number(curr.count);
            return acc;
          },
          {}
        ),
        timestamp: /* @__PURE__ */ new Date()
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

// src/modules/rag/rag.controller.ts
var ragService = new RAGService();
var getStats2 = async (req, res) => {
  const result = await ragService.getStats();
  res.status(200).json({
    success: true,
    httpStatusCode: 200,
    message: "RAG stats retrieved successfully",
    data: result
  });
};
var ingestMedicines = async (req, res) => {
  const result = await ragService.ingestMedicinesData();
  res.status(200).json({
    success: true,
    httpStatusCode: 200,
    message: "Medicine Data Ingested Successfully",
    data: result
  });
};
var queryRag = async (req, res) => {
  const { query, limit, sourceType } = req.body;
  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Query is required"
    });
  }
  try {
    const result = await ragService.generateAnswer(
      query,
      limit ?? 5,
      sourceType,
      true
    );
    res.status(200).json({
      success: true,
      message: "AI response generated successfully",
      data: result
    });
  } catch (error) {
    console.error("RAG Query Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI response"
    });
  }
};
var RagController = {
  getStats: getStats2,
  ingestMedicines,
  queryRag
};

// src/modules/rag/rag.route.ts
var router7 = Router3();
router7.get("/stats", RagController.getStats);
router7.post("/ingest-medicines", RagController.ingestMedicines);
router7.post("/query", RagController.queryRag);
var RagRoutes = router7;

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  console.log("--- ERROR DETECTED ---");
  console.log(err);
  let statusCode = 500;
  let errorMessage = err.message || "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "You provide incorrect field type or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 400;
      errorMessage = "An operation  failed because it depends on one or more records that were required but not found";
    } else if (err.code === "P2002") {
      statusCode = 400;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMessage = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMessage = "Authentication Failed. Please check your credentials";
    } else if (err.errorCode === "P1001") {
      statusCode = 400;
      errorMessage = "Cant't reach server";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var globalErrorHandler_default = errorHandler;

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}

// src/app.ts
var app = express7();
app.set("trust proxy", 1);
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express7.json());
app.use("/api/categories", categoryRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/orders", orderRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/rag", RagRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(notFound);
app.use(globalErrorHandler_default);
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 5e3;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully");
    if (process.env.NODE_ENV !== "production") {
      app_default.listen(PORT, () => {
        console.log(`Medicine Corner is running on ${PORT}`);
      });
    }
  } catch (error) {
    console.log("An error occurred during database connection", error);
    if (process.env.NODE_ENV !== "production") {
      await prisma.$disconnect();
      process.exit(1);
    }
  }
}
main();
var server_default = app_default;
export {
  server_default as default
};
