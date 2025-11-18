import { Router } from 'express';
import { authorize } from '../../middlewares/authorized';
import validate from '../../middlewares/validate';
import { isLoggedIn } from '../../middlewares/verify';
import {
  createTenant,
  deleteTenant,
  getTenantById,
  getTenants,
  updateTenant,
} from './tenant.controller';
import {
  createTenantSchema,
  getTenantByIdSchema,
  getTenantsQuerySchema,
  updateTenantSchema,
} from './tenant.validation';

const tenantRouter = Router();

// admin only
tenantRouter.use(isLoggedIn, authorize(['admin']));

tenantRouter.get('/', validate(getTenantsQuerySchema), getTenants);

tenantRouter.post('/', validate(createTenantSchema), createTenant);

tenantRouter.get('/:id', validate(getTenantByIdSchema), getTenantById);

tenantRouter.put('/:id', validate(updateTenantSchema), updateTenant);

tenantRouter.delete('/:id', deleteTenant);

export default tenantRouter;
