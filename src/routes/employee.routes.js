import { Router } from "express";
import * as employeeController from "../controllers/employee.controller.js";

const router = Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:code", employeeController.getEmployee);
router.post("/", employeeController.createEmployee);
router.post("/:code", employeeController.updateEmployee);

export default router;
