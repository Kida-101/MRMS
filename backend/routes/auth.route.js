import { Router } from "express";
import { register, login, logout, isAuthenticated } from "../controllers/auth.controller.js";
import adminAuth from "../middleware/admin.auth.js";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/is-auth', adminAuth, isAuthenticated);

export default authRouter;
