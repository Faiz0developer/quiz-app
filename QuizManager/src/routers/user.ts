import express from "express";
import { getUser, updateUser } from "../controllers/user";
import { isAuthenticated } from "../middlewares/isAuth";

const router = express.Router();

// user should be authenticated
//user sshould be authorized
//get user
router.get("/:userId", isAuthenticated, getUser);

// user should be authenticated
//user sshould be authorized
// update user
router.put("/", isAuthenticated, updateUser);

export default router;
