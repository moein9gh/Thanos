import { Router } from "@gateway";
import express from "express";

export interface IRouter {
  getRouter(): express.Router;
}

export interface IRoutes {
  registerRoutes(): Router;
}
