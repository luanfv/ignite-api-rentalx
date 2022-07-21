import { parse } from 'csv-parse';
import fs from 'fs';

import { ICategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      const categories: IImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach((category) => {
      const { name, description } = category;
      const categoryExists = this.categoriesRepository.findByName(name);

      if (!categoryExists) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
