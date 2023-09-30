import express from "express";
import { adminRouer, vendorRouer,ShoppingRouter, customerRouter } from "../routes/index.js";
import cors from "cors";

export const startExpress = async(app) => {
  app.use(express.json());
  app.use(cors());
  app.use("/vendor", vendorRouer);
  app.use("/admin", adminRouer);
  app.use("/shopping", ShoppingRouter);
  app.use("/customer", customerRouter);
};
