import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  private importCategoryUseCase: ImportCategoryUseCase;

  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      if (file) {
        await this.importCategoryUseCase.execute(file);

        return response.send();
      }

      throw new Error();
    } catch {
      return response.status(400).send();
    }
  }
}

export { ImportCategoryController };
