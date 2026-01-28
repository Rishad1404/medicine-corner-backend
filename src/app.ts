import express, { Application } from "express";
import { categoryRouter } from "./modules/category/category.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"
import { medicineRouter } from "./modules/medicine/medicine.router";
import { orderRouter } from "./modules/order/order.router";
import { sellerRouter } from "./modules/seller/seller.router";


const app:Application=express();

app.use(cors({
    origin:process.env.APP_URL || "http://localhost:4000",   //Client site 
    credentials:true
}))

app.all("/api/auth/*splat",toNodeHandler(auth))

app.use(express.json())

app.use("/api/categories",categoryRouter);
app.use("/api/medicines",medicineRouter);
app.use("/api/orders",orderRouter);
app.use("/api/seller",sellerRouter)


app.get("/",(req,res)=>{
    res.send("Hello World!");
})

export default app;