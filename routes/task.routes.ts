import express from "express";
import {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/task.controllers";
import { taskCreateValidation, taskUpdateValidation } from "../utils/validations";

const router = express.Router();

const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

router.post("/", validate(taskCreateValidation), addTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", validate(taskUpdateValidation), updateTask);
router.delete("/:id", deleteTask);

export default router;
