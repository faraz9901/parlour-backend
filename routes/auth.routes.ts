import express from "express";
import { asyncHandler, AppResponse } from "../utils";
import User from "../models/user.model";
const router = express.Router();


router.post('/login', asyncHandler(async (req, res) => {

}));



router.post('/register', asyncHandler(async (req, res) => {



}));

export default router;
