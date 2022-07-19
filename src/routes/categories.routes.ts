import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const categoryExists = categoriesRepository.findByName(name);

  if (categoryExists) {
    return response.status(400).json({ error: 'Category already exists!' });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (_, response) => {
  const categories = categoriesRepository.list();

  return response.json({ categories });
});

export { categoriesRoutes };