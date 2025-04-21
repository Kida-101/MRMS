import Router from 'express';
import { getTenants, createTenant, getTenant, updateTenant, deleteTenant } from '../controllers/tenant.controller.js';

const tenantRouter = Router();

tenantRouter.get('/tenants', getTenants);
tenantRouter.get('/tenants/:id', getTenant);
tenantRouter.post('/tenants', createTenant);
tenantRouter.put('/tenants/:id', updateTenant);
tenantRouter.delete('/tenants/:id', deleteTenant);

export default tenantRouter;
