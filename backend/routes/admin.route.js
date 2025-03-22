import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmin, getAdmins, updateAdmin } from "../controllers/admin.controller.js";
import adminAuth from "../middleware/admin.auth.js";

const adminRouter = Router();

adminRouter.get('/admins', getAdmins);
adminRouter.get('/admin', adminAuth, getAdmin);
adminRouter.post('/admin', createAdmin);
adminRouter.delete('/admin', deleteAdmin);
adminRouter.put('/admin', updateAdmin);

export default adminRouter;