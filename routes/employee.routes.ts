import express from "express";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../controllers/employee.controllers";
import { employeeCreateValidation, employeeUpdateValidation } from "../utils/validations";

const router = express.Router();

const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

router.post("/", validate(employeeCreateValidation), addEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", validate(employeeUpdateValidation), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
