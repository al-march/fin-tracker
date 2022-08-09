import { ApiRoute, BaseApi } from '@app/services/api/base';
import { CategoryDto } from '@app/models';
import { Category } from '@app/services/mappers';

const defaultCat: CategoryDto = {
  id: 0,
  name: 'other'
};

@ApiRoute('category')
export class CategoryApi extends BaseApi {
  private categories: Map<number, Category> = new Map();

  async getAll() {
    if (this.categories.size) {
      return this.getClone();
    }

    this.categories.clear();
    const res = await this.get<CategoryDto[]>('');
    this.catMapping(res.data);

    return this.getClone();
  }

  private catMapping(cats: CategoryDto[] = []) {
    [defaultCat, ...cats].forEach(cat => {
      this.categories.set(cat.id, new Category(cat));
    });
  }

  private getClone() {
    return new Map(this.categories);
  }
}

export const categoryApi = new CategoryApi();
