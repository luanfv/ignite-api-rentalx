/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request, response) => {
  try {
    const { name, description } = request.body;
    const createSpecificationsService = new CreateSpecificationService(
      specificationsRepository,
    );

    createSpecificationsService.execute({ name, description });

    return response.status(201).send();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export { specificationsRoutes };
