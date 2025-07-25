import express from "express";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkRole from "../middlewares/checkRole.middleware";
import { Role } from "../utils/enums";
import {
    taskCreationController,
    taskDeleteController,
    taskGetAllController,
    taskUpdateController
} from "../controllers/task.controllers";
import { taskCreateValidation, taskUpdateValidation } from "../utils/validations";
import { validate } from "../utils";

const router = express.Router();


// Create task - Only super admins can create tasks
router.post(
    '/create',
    checkAuth,
    checkRole([Role.SUPER_ADMIN]),
    validate(taskCreateValidation),
    taskCreationController
);

// Update task - Only super admins can update tasks
router.put(
    '/update/:id',
    checkAuth,
    checkRole([Role.SUPER_ADMIN]),
    validate(taskUpdateValidation),
    taskUpdateController
);

// Delete task - Only super admins can delete tasks
router.delete(
    '/delete/:id',
    checkAuth,
    checkRole([Role.SUPER_ADMIN]),
    taskDeleteController
);

// Get all tasks - Available to all authenticated users
router.get(
    '/',
    checkAuth,
    taskGetAllController
);

export default router;
