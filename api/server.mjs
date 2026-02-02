var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}
var config;
var init_class = __esm({
  "generated/prisma/internal/class.ts"() {
    "use strict";
    config = {
      "previewFeatures": [],
      "clientVersion": "7.3.0",
      "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
      "activeProvider": "postgresql",
      "inlineSchema": 'enum UserStatus {\n  ACTIVE\n  BLOCKED\n}\n\nmodel User {\n  id            String    @id\n  name          String\n  email         String\n  emailVerified Boolean   @default(false)\n  image         String?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n  sessions      Session[]\n  accounts      Account[]\n  reviews       Review[]\n\n  role   String?    @default("CUSTOMER")\n  phone  String?\n  status UserStatus @default(ACTIVE)\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Category {\n  id        String     @id @default(uuid())\n  name      String     @unique @db.VarChar(100)\n  medicines Medicine[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("categories")\n}\n\nmodel Medicine {\n  id           String  @id @default(uuid())\n  name         String  @db.VarChar(150)\n  description  String? @db.Text\n  price        Int\n  stock        Int\n  manufacturer String  @db.VarChar(100)\n\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n  image      String?\n\n  sellerId String\n\n  reviews    Review[]\n  orderItems OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([categoryId])\n  @@map("medicines")\n}\n\nenum OrderStatus {\n  PLACED\n  PROCESSING\n  SHIPPED\n  DELIVERED\n  CANCELLED\n}\n\nmodel Order {\n  id              String      @id @default(uuid())\n  totalAmount     Int\n  status          OrderStatus @default(PLACED)\n  shippingAddress String      @db.Text\n\n  customerId String\n  items      OrderItem[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id         String   @id @default(uuid())\n  quantity   Int\n  price      Int\n  orderId    String\n  order      Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id])\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id         String   @id @default(uuid())\n  rating     Int      @default(5)\n  comment    String?  @db.Text\n  customerId String\n  customer   User     @relation(fields: [customerId], references: [id], onDelete: Cascade)\n  medicineId String\n  medicine   Medicine @relation(fields: [medicineId], references: [id], onDelete: Cascade)\n  createdAt  DateTime @default(now())\n\n  @@map("reviews")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
      "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
      }
    };
    config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"UserStatus"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"medicines","kind":"object","type":"Medicine","relationName":"CategoryToMedicine"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"categories"},"Medicine":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Int"},{"name":"stock","kind":"scalar","type":"Int"},{"name":"manufacturer","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMedicine"},{"name":"image","kind":"scalar","type":"String"},{"name":"sellerId","kind":"scalar","type":"String"},{"name":"reviews","kind":"object","type":"Review","relationName":"MedicineToReview"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MedicineToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"medicines"},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Int"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"shippingAddress","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Int"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"customer","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"medicineId","kind":"scalar","type":"String"},{"name":"medicine","kind":"object","type":"Medicine","relationName":"MedicineToReview"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":"reviews"}},"enums":{},"types":{}}');
    config.compilerWasm = {
      getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
      getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
      },
      importName: "./query_compiler_fast_bg.js"
    };
  }
});

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
var PrismaClientKnownRequestError2, PrismaClientUnknownRequestError2, PrismaClientRustPanicError2, PrismaClientInitializationError2, PrismaClientValidationError2, sql, empty2, join2, raw2, Sql2, Decimal2, getExtensionContext, prismaVersion, NullTypes2, DbNull2, JsonNull2, AnyNull2, ModelName, TransactionIsolationLevel, UserScalarFieldEnum, SessionScalarFieldEnum, AccountScalarFieldEnum, VerificationScalarFieldEnum, CategoryScalarFieldEnum, MedicineScalarFieldEnum, OrderScalarFieldEnum, OrderItemScalarFieldEnum, ReviewScalarFieldEnum, SortOrder, QueryMode, NullsOrder, defineExtension;
var init_prismaNamespace = __esm({
  "generated/prisma/internal/prismaNamespace.ts"() {
    "use strict";
    PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
    PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
    PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
    PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
    PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
    sql = runtime2.sqltag;
    empty2 = runtime2.empty;
    join2 = runtime2.join;
    raw2 = runtime2.raw;
    Sql2 = runtime2.Sql;
    Decimal2 = runtime2.Decimal;
    getExtensionContext = runtime2.Extensions.getExtensionContext;
    prismaVersion = {
      client: "7.3.0",
      engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
    };
    NullTypes2 = {
      DbNull: runtime2.NullTypes.DbNull,
      JsonNull: runtime2.NullTypes.JsonNull,
      AnyNull: runtime2.NullTypes.AnyNull
    };
    DbNull2 = runtime2.DbNull;
    JsonNull2 = runtime2.JsonNull;
    AnyNull2 = runtime2.AnyNull;
    ModelName = {
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
    TransactionIsolationLevel = runtime2.makeStrictEnum({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    UserScalarFieldEnum = {
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
    SessionScalarFieldEnum = {
      id: "id",
      expiresAt: "expiresAt",
      token: "token",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      ipAddress: "ipAddress",
      userAgent: "userAgent",
      userId: "userId"
    };
    AccountScalarFieldEnum = {
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
    VerificationScalarFieldEnum = {
      id: "id",
      identifier: "identifier",
      value: "value",
      expiresAt: "expiresAt",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    CategoryScalarFieldEnum = {
      id: "id",
      name: "name",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    MedicineScalarFieldEnum = {
      id: "id",
      name: "name",
      description: "description",
      price: "price",
      stock: "stock",
      manufacturer: "manufacturer",
      categoryId: "categoryId",
      image: "image",
      sellerId: "sellerId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    OrderScalarFieldEnum = {
      id: "id",
      totalAmount: "totalAmount",
      status: "status",
      shippingAddress: "shippingAddress",
      customerId: "customerId",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    OrderItemScalarFieldEnum = {
      id: "id",
      quantity: "quantity",
      price: "price",
      orderId: "orderId",
      medicineId: "medicineId"
    };
    ReviewScalarFieldEnum = {
      id: "id",
      rating: "rating",
      comment: "comment",
      customerId: "customerId",
      medicineId: "medicineId",
      createdAt: "createdAt"
    };
    SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    NullsOrder = {
      first: "first",
      last: "last"
    };
    defineExtension = runtime2.Extensions.defineExtension;
  }
});

// generated/prisma/enums.ts
var init_enums = __esm({
  "generated/prisma/enums.ts"() {
    "use strict";
  }
});

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";
var PrismaClient;
var init_client = __esm({
  "generated/prisma/client.ts"() {
    "use strict";
    init_class();
    init_prismaNamespace();
    init_enums();
    init_enums();
    globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
    PrismaClient = getPrismaClientClass();
  }
});

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
var connectionString, adapter, prisma;
var init_prisma = __esm({
  "src/lib/prisma.ts"() {
    "use strict";
    init_client();
    connectionString = `${process.env.DATABASE_URL}`;
    adapter = new PrismaPg({ connectionString });
    prisma = new PrismaClient({ adapter });
  }
});

// src/modules/category/category.service.ts
var createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory, categoryService;
var init_category_service = __esm({
  "src/modules/category/category.service.ts"() {
    "use strict";
    init_prisma();
    createCategory = async (data) => {
      const result = await prisma.category.create({
        data
      });
      return result;
    };
    getAllCategories = async () => {
      const result = await prisma.category.findMany();
      return result;
    };
    getSingleCategory = async (id) => {
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
    updateCategory = async (id, data) => {
      const result = await prisma.category.update({
        where: { id },
        data
      });
      return result;
    };
    deleteCategory = async (id) => {
      const result = await prisma.category.delete({
        where: { id }
      });
      return result;
    };
    categoryService = {
      createCategory,
      getAllCategories,
      getSingleCategory,
      updateCategory,
      deleteCategory
    };
  }
});

// src/modules/category/category.controller.ts
var createCategory2, getAllCategories2, getSingleCategory2, updateCategory2, deleteCategory2, categoryController;
var init_category_controller = __esm({
  "src/modules/category/category.controller.ts"() {
    "use strict";
    init_category_service();
    createCategory2 = async (req, res, next) => {
      try {
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
      } catch (error) {
        next();
      }
    };
    getAllCategories2 = async (req, res, next) => {
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
    getSingleCategory2 = async (req, res, next) => {
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
    updateCategory2 = async (req, res, next) => {
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
    deleteCategory2 = async (req, res, next) => {
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
    categoryController = {
      createCategory: createCategory2,
      getAllCategories: getAllCategories2,
      getSingleCategory: getSingleCategory2,
      updateCategory: updateCategory2,
      deleteCategory: deleteCategory2
    };
  }
});

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth;
var init_auth = __esm({
  "src/lib/auth.ts"() {
    "use strict";
    init_prisma();
    auth = betterAuth({
      database: prismaAdapter(prisma, {
        provider: "postgresql"
      }),
      trustedOrigins: [process.env.APP_URL],
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
      }
      //   emailVerification: {
      //     sendVerificationEmail: async ({ user, url, token }, request) => {
      //       const info = await transporter.sendMail({
      //         from: '"Medicine Corner" <medicinecorner@gmail.com>',
      //         to: "akbarali14041@gmail.com",
      //         subject: "Hello ✔",
      //         text: "Hello world?", // Plain-text version of the message
      //         html: "<b>Hello world?</b>", // HTML version of the message
      //       });
      //       console.log("Message sent:", info.messageId);
      //     },
      //   },
    });
  }
});

// src/middlewares/auth.ts
var auth2, auth_default;
var init_auth2 = __esm({
  "src/middlewares/auth.ts"() {
    "use strict";
    init_auth();
    auth2 = (...roles) => {
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
    auth_default = auth2;
  }
});

// src/modules/category/category.router.ts
import express from "express";
var router, categoryRouter;
var init_category_router = __esm({
  "src/modules/category/category.router.ts"() {
    "use strict";
    init_category_controller();
    init_auth2();
    router = express.Router();
    router.post("/", auth_default("ADMIN" /* ADMIN */), categoryController.createCategory);
    router.get("/", categoryController.getAllCategories);
    router.get("/:id", auth_default("ADMIN" /* ADMIN */), categoryController.getSingleCategory);
    router.patch("/:id", auth_default("ADMIN" /* ADMIN */), categoryController.updateCategory);
    router.delete("/:id", auth_default("ADMIN" /* ADMIN */), categoryController.deleteCategory);
    categoryRouter = router;
  }
});

// src/modules/medicine/medicine.service.ts
var createMedicine, getAllMedicines, getSingleMedicine, updateMedicine, deleteMedicine, medicineService;
var init_medicine_service = __esm({
  "src/modules/medicine/medicine.service.ts"() {
    "use strict";
    init_prisma();
    createMedicine = async (data, userId) => {
      const result = await prisma.medicine.create({
        data: {
          ...data,
          sellerId: userId
        }
      });
      return result;
    };
    getAllMedicines = async ({
      search,
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
      const result = await prisma.medicine.findMany({
        take: limit,
        skip,
        where: {
          AND: andConditions
        },
        orderBy: {
          [sortBy]: sortOrder
        }
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
    getSingleMedicine = async (id) => {
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
    updateMedicine = async (id, data) => {
      const result = await prisma.medicine.update({
        where: { id },
        data
      });
      return result;
    };
    deleteMedicine = async (id) => {
      const result = await prisma.medicine.delete({
        where: { id }
      });
      return result;
    };
    medicineService = {
      createMedicine,
      getAllMedicines,
      getSingleMedicine,
      updateMedicine,
      deleteMedicine
    };
  }
});

// src/helpers/paginationSortingHelper.ts
var paginationSortingHelper, paginationSortingHelper_default;
var init_paginationSortingHelper = __esm({
  "src/helpers/paginationSortingHelper.ts"() {
    "use strict";
    paginationSortingHelper = (options) => {
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
    paginationSortingHelper_default = paginationSortingHelper;
  }
});

// src/modules/medicine/medicine.controller.ts
var createMedicine2, getAllMedicines2, getSingleMedicine2, updateMedicine2, deleteMedicine2, medicineController;
var init_medicine_controller = __esm({
  "src/modules/medicine/medicine.controller.ts"() {
    "use strict";
    init_medicine_service();
    init_paginationSortingHelper();
    createMedicine2 = async (req, res, next) => {
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
    getAllMedicines2 = async (req, res, next) => {
      try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : void 0;
        const { sortBy, sortOrder, page, limit, skip } = paginationSortingHelper_default(
          req.query
        );
        const result = await medicineService.getAllMedicines({
          search: searchString,
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
    getSingleMedicine2 = async (req, res, next) => {
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
    updateMedicine2 = async (req, res, next) => {
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
    deleteMedicine2 = async (req, res, next) => {
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
    medicineController = {
      createMedicine: createMedicine2,
      getAllMedicines: getAllMedicines2,
      getSingleMedicine: getSingleMedicine2,
      updateMedicine: updateMedicine2,
      deleteMedicine: deleteMedicine2
    };
  }
});

// src/modules/medicine/medicine.router.ts
import express2 from "express";
var router2, medicineRouter;
var init_medicine_router = __esm({
  "src/modules/medicine/medicine.router.ts"() {
    "use strict";
    init_medicine_controller();
    router2 = express2.Router();
    router2.get("/", medicineController.getAllMedicines);
    router2.get("/:id", medicineController.getSingleMedicine);
    medicineRouter = router2;
  }
});

// src/modules/order/order.service.ts
var createOrder, getMyAllOrders, getSingleOrder, orderService;
var init_order_service = __esm({
  "src/modules/order/order.service.ts"() {
    "use strict";
    init_prisma();
    createOrder = async (userId, payload) => {
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
    getMyAllOrders = async (userId) => {
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
    getSingleOrder = async (orderId, userId) => {
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
    orderService = {
      createOrder,
      getMyAllOrders,
      getSingleOrder
    };
  }
});

// src/modules/order/order.controller.ts
var createOrder2, getMyAllOrders2, getSingleOrder2, orderController;
var init_order_controller = __esm({
  "src/modules/order/order.controller.ts"() {
    "use strict";
    init_order_service();
    createOrder2 = async (req, res, next) => {
      try {
        const userId = req.user.id;
        const result = await orderService.createOrder(userId, req.body);
        res.status(200).json({
          success: true,
          message: "Order placed successfully",
          data: result
        });
      } catch (error) {
        next();
      }
    };
    getMyAllOrders2 = async (req, res, next) => {
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
    getSingleOrder2 = async (req, res, next) => {
      try {
        const userId = req.user.id;
        const result = await orderService.getSingleOrder(req.params.id, userId);
        res.status(200).json({
          success: true,
          message: "Order details fetched",
          data: result
        });
      } catch (err) {
        next();
      }
    };
    orderController = {
      createOrder: createOrder2,
      getMyAllOrders: getMyAllOrders2,
      getSingleOrder: getSingleOrder2
    };
  }
});

// src/modules/seller/seller.service.ts
var getSellerOrders, updateOrderStatus, getSellerStats, sellerService;
var init_seller_service = __esm({
  "src/modules/seller/seller.service.ts"() {
    "use strict";
    init_prisma();
    getSellerOrders = async (sellerId) => {
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
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
      return result;
    };
    updateOrderStatus = async (orderId, status) => {
      const result = await prisma.order.update({
        where: { id: orderId },
        data: { status }
      });
      return result;
    };
    getSellerStats = async (sellerId) => {
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
          quantity: true
        }
      });
      const totalRevenue = mySoldItems.reduce((acc, item) => {
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
      return {
        totalMedicines,
        totalOrders,
        totalRevenue,
        pendingOrders
      };
    };
    sellerService = {
      getSellerOrders,
      updateOrderStatus,
      getSellerStats
    };
  }
});

// src/modules/seller/seller.controller.ts
var getSellerOrders2, updateOrderStatus2, getSellerStats2, sellerController;
var init_seller_controller = __esm({
  "src/modules/seller/seller.controller.ts"() {
    "use strict";
    init_seller_service();
    getSellerOrders2 = async (req, res, next) => {
      try {
        const sellerId = req.user.id;
        const result = await sellerService.getSellerOrders(sellerId);
        res.status(200).json({
          success: true,
          message: "Seller orders fetched successfully",
          data: result
        });
      } catch (err) {
        next();
      }
    };
    updateOrderStatus2 = async (req, res, next) => {
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
        next();
      }
    };
    getSellerStats2 = async (req, res, next) => {
      try {
        const sellerId = req.user.id;
        const result = await sellerService.getSellerStats(sellerId);
        res.status(200).json({
          success: true,
          message: "Seller stats fetched successfully",
          data: result
        });
      } catch (err) {
        next();
      }
    };
    sellerController = {
      getSellerOrders: getSellerOrders2,
      updateOrderStatus: updateOrderStatus2,
      getSellerStats: getSellerStats2
    };
  }
});

// src/modules/order/order.router.ts
import express3 from "express";
var router3, orderRouter;
var init_order_router = __esm({
  "src/modules/order/order.router.ts"() {
    "use strict";
    init_auth2();
    init_order_controller();
    init_seller_controller();
    router3 = express3.Router();
    router3.post("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.createOrder);
    router3.get("/", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getMyAllOrders);
    router3.get("/:id", auth_default("CUSTOMER" /* CUSTOMER */), orderController.getSingleOrder);
    router3.get("/orders", auth_default("SELLER" /* SELLER */), sellerController.getSellerOrders);
    router3.patch("/orders/:id", auth_default("SELLER" /* SELLER */), sellerController.updateOrderStatus);
    orderRouter = router3;
  }
});

// src/modules/seller/seller.router.ts
import express4 from "express";
var router4, sellerRouter;
var init_seller_router = __esm({
  "src/modules/seller/seller.router.ts"() {
    "use strict";
    init_auth2();
    init_medicine_controller();
    init_seller_controller();
    router4 = express4.Router();
    router4.post("/medicines", auth_default("SELLER" /* SELLER */), medicineController.createMedicine);
    router4.patch("/medicines/:id", auth_default("SELLER" /* SELLER */), medicineController.updateMedicine);
    router4.delete("/medicines/:id", auth_default("SELLER" /* SELLER */), medicineController.deleteMedicine);
    router4.get("/orders", auth_default("SELLER" /* SELLER */), sellerController.getSellerOrders);
    router4.patch("/orders/:id", auth_default("SELLER" /* SELLER */), sellerController.updateOrderStatus);
    router4.get("/stats", auth_default("SELLER" /* SELLER */), sellerController.getSellerStats);
    sellerRouter = router4;
  }
});

// src/modules/admin/admin.service.ts
var getAllUsers, updateUserStatus, getDashboardStats, adminService;
var init_admin_service = __esm({
  "src/modules/admin/admin.service.ts"() {
    "use strict";
    init_prisma();
    getAllUsers = async () => {
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
    updateUserStatus = async (userId, payload) => {
      const result = await prisma.user.update({
        where: { id: userId },
        data: payload
      });
      return result;
    };
    getDashboardStats = async () => {
      const totalUsers = await prisma.user.count();
      const totalMedicines = await prisma.medicine.count();
      const totalOrders = await prisma.order.count();
      const revenueData = await prisma.order.aggregate({
        _sum: {
          totalAmount: true
        }
      });
      const totalRevenue = revenueData._sum.totalAmount || 0;
      return {
        totalUsers,
        totalMedicines,
        totalOrders,
        totalRevenue
      };
    };
    adminService = {
      getAllUsers,
      updateUserStatus,
      getDashboardStats
    };
  }
});

// src/modules/admin/admin.controller.ts
var getAllUsers2, updateUserStatus2, getStats, adminController;
var init_admin_controller = __esm({
  "src/modules/admin/admin.controller.ts"() {
    "use strict";
    init_admin_service();
    getAllUsers2 = async (req, res, next) => {
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
    updateUserStatus2 = async (req, res, next) => {
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
    getStats = async (req, res, next) => {
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
    adminController = {
      getAllUsers: getAllUsers2,
      updateUserStatus: updateUserStatus2,
      getStats
    };
  }
});

// src/modules/admin/admin.router.ts
import express5 from "express";
var router5, adminRouter;
var init_admin_router = __esm({
  "src/modules/admin/admin.router.ts"() {
    "use strict";
    init_auth2();
    init_admin_controller();
    router5 = express5.Router();
    router5.get("/users", auth_default("ADMIN" /* ADMIN */), adminController.getAllUsers);
    router5.patch("/users/:id", auth_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
    router5.get("/stats", auth_default("ADMIN" /* ADMIN */), adminController.getStats);
    adminRouter = router5;
  }
});

// src/modules/review/review.service.ts
var createReview, getReviewsForMedicine, reviewService;
var init_review_service = __esm({
  "src/modules/review/review.service.ts"() {
    "use strict";
    init_prisma();
    createReview = async (customerId, payload) => {
      if (payload.rating < 1 || payload.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      const medicine = await prisma.medicine.findUnique({
        where: { id: payload.medicineId }
      });
      if (!medicine) {
        throw new Error("Medicine not found");
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
    getReviewsForMedicine = async (medicineId) => {
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
    reviewService = {
      createReview,
      getReviewsForMedicine
    };
  }
});

// src/modules/review/review.controller.ts
var addReview, getMedicineReviews, reviewController;
var init_review_controller = __esm({
  "src/modules/review/review.controller.ts"() {
    "use strict";
    init_review_service();
    addReview = async (req, res, next) => {
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
    getMedicineReviews = async (req, res, next) => {
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
    reviewController = {
      addReview,
      getMedicineReviews
    };
  }
});

// src/modules/review/review.router.ts
import express6 from "express";
var router6, reviewRouter;
var init_review_router = __esm({
  "src/modules/review/review.router.ts"() {
    "use strict";
    init_auth2();
    init_review_controller();
    router6 = express6.Router();
    router6.post("/", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.addReview);
    router6.get("/:medicineId", auth_default("CUSTOMER" /* CUSTOMER */), reviewController.getMedicineReviews);
    reviewRouter = router6;
  }
});

// src/middlewares/globalErrorHandler.ts
function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMessage = "Internal Server Error";
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
var globalErrorHandler_default;
var init_globalErrorHandler = __esm({
  "src/middlewares/globalErrorHandler.ts"() {
    "use strict";
    init_client();
    globalErrorHandler_default = errorHandler;
  }
});

// src/middlewares/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
}
var init_notFound = __esm({
  "src/middlewares/notFound.ts"() {
    "use strict";
  }
});

// src/app.ts
import express7 from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
var app, app_default;
var init_app = __esm({
  "src/app.ts"() {
    "use strict";
    init_category_router();
    init_auth();
    init_medicine_router();
    init_order_router();
    init_seller_router();
    init_admin_router();
    init_review_router();
    init_globalErrorHandler();
    init_notFound();
    app = express7();
    app.use(cors({
      origin: process.env.APP_URL || "http://localhost:4000",
      //Client site 
      credentials: true
    }));
    app.all("/api/auth/*splat", toNodeHandler(auth));
    app.use(express7.json());
    app.use("/api/categories", categoryRouter);
    app.use("/api/medicines", medicineRouter);
    app.use("/api/orders", orderRouter);
    app.use("/api/seller", sellerRouter);
    app.use("/api/admin", adminRouter);
    app.use("/api/reviews", reviewRouter);
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    app.use(notFound);
    app.use(globalErrorHandler_default);
    app_default = app;
  }
});

// src/server.ts
var require_server = __commonJS({
  "src/server.ts"() {
    init_app();
    init_prisma();
    var PORT = process.env.PORT || 3e3;
    async function main() {
      try {
        await prisma.$connect();
        console.log("Connected to the database successfully");
        app_default.listen(PORT, () => {
          console.log(`Medicine Corner is running on ${PORT}`);
        });
      } catch (error) {
        console.log("An error occurred", error);
        await prisma.$disconnect();
        process.exit(1);
      }
    }
    main();
  }
});
export default require_server();
