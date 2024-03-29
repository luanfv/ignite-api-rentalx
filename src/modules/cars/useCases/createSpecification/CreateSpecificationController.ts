import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  private createSpecificationUseCase: CreateSpecificationUseCase;

  constructor(createSpecificationUseCase: CreateSpecificationUseCase) {
    this.createSpecificationUseCase = createSpecificationUseCase;
  }

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      this.createSpecificationUseCase.execute({ name, description });

      return response.status(201).send();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateSpecificationController };
