import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, updateAdmin, updateAdminPassword, getLoggedInAdmin } from "../controllers/admin.controller.js";
import adminAuth from "../middleware/admin.auth.js";

const adminRouter = Router();

adminRouter.get('/admins', getAdmins);
adminRouter.get('/admins/me', adminAuth, getLoggedInAdmin);
adminRouter.get('/admins/:id', getAdmin);
adminRouter.post('/admins/:id', createAdmin);
adminRouter.delete('/admins/:id', deleteAdmin);
adminRouter.put('/admins/:id', updateAdmin);
adminRouter.put('/admins/password/:id', updateAdminPassword);

export default adminRouter;