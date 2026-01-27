import express, { Application } from "express";
import { categoryRouter } from "./modules/category/category.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors"

const app:Application=express();

app.use(cors({
    origin:process.env.APP_URL || "http://localhost:4000"
}))

app.all("/api/auth/*splat",toNodeHandler(auth))

app.use(express.json())

app.use("/api/categories",categoryRouter);

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

export default app;