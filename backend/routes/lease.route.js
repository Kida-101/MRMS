import Router from 'express';
import { createLease, getLease, getLeases, updateLease, deleteLease } from '../controllers/lease.controller.js';

const leaseRouter = Router();

leaseRouter.post('/leases', createLease);
leaseRouter.get('/leases', getLeases);
leaseRouter.get('/leases/:id', getLease);
leaseRouter.put('/leases/:id', updateLease);
leaseRouter.delete('/leases/:id', deleteLease);

export default leaseRouter;
