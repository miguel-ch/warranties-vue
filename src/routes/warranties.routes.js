import { Router } from "express";
import * as warrantiesController from "../controllers/warranties.controller.js";

const router = Router();

router.get("/", warrantiesController.getWarranties);
router.get("/:id", warrantiesController.getWarranty);
router.post("/", warrantiesController.createWarranty);
router.post("/:id", warrantiesController.updateWarranty);
router.post("/:id/deliver", warrantiesController.deliverWarranty);

export default router;
