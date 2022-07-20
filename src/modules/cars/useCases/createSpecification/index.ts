import { SpecificationsRepository } from '../../repositories/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  // eslint-disable-next-line prettier/prettier
  specificationRepository,
);
const createSpecificationController = new CreateSpecificationController(
  // eslint-disable-next-line prettier/prettier
  createSpecificationUseCase,
);

export { createSpecificationController };
