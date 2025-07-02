import express from "express";
import { asyncHandler, AppResponse } from "../utils";
import User from "../models/user.model";
import { loginController } from "../controllers/auth.controllers";
const router = express.Router();


router.post('/login', loginController);



router.post('/register', asyncHandler(async (req, res) => {



}));

export default router;
