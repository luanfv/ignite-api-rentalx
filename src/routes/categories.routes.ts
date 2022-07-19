/* eslint-disable prettier/prettier */
import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  try {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(
      categoriesRepository,
    );

    createCategoryService.execute({ name, description });

    return response.status(201).send();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

categoriesRoutes.get('/', (_, response) => {
  const categories = categoriesRepository.list();

  return response.json({ categories });
});

export { categoriesRoutes };
