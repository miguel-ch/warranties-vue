import { Router } from "express";
import * as exchangeController from "../controllers/exhange.controller.js";

const router = Router();

router.get("/", exchangeController.getAllExchanges);
router.get("/:warrantyId", exchangeController.getExchange);
router.post("/", exchangeController.createExchange);

export default router;
