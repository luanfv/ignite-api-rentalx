import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) =>
  // eslint-disable-next-line implicit-arrow-linebreak, prettier/prettier
  createSpecificationController.handle(request, response));

export { specificationsRoutes };
