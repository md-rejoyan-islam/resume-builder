import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/async-handler';
import { successResponse } from '../../utils/response-handler';
import { TenantService } from './tenant.service';
import { GetTenantsQuery } from './tenant.validation';

export const getTenants = asyncHandler(async (req: Request, res: Response) => {
  const data = await TenantService.list(req.query as GetTenantsQuery);
  successResponse(res, {
    statusCode: 200,
    message: 'Tenants fetched',
    payload: { ...data },
  });
});

export const getTenantById = asyncHandler(
  async (req: Request, res: Response) => {
    const fields = req.query.fields as string | undefined;
    const data = await TenantService.getById(req.params.id, fields);
    successResponse(res, {
      statusCode: 200,
      message: 'Tenant fetched',
      payload: { data },
    });
  },
);

export const createTenant = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await TenantService.create(req.body);
    successResponse(res, {
      statusCode: 201,
      message: 'Tenant created',
      payload: { data },
    });
  },
);

export const updateTenant = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await TenantService.update(req.params.id, req.body);
    successResponse(res, {
      statusCode: 200,
      message: 'Tenant updated',
      payload: { data },
    });
  },
);

export const deleteTenant = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await TenantService.remove(req.params.id);
    successResponse(res, {
      statusCode: 200,
      message: 'Tenant deleted',
      payload: { data },
    });
  },
);
