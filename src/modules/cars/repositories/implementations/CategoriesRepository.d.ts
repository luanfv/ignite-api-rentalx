import { Category } from '../../model/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO);

  list(): Category[];

  findByName(name: string): Category | undefined;
}

export type { ICreateCategoryDTO, ICategoriesRepository };
