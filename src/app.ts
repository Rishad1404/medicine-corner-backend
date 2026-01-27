import express, { Application } from "express";
import { categoryRouter } from "./modules/category/category.router";

const app:Application=express();
app.use(express.json())

app.use("/api/categories",categoryRouter);

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

export default app;