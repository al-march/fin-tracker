import { CategoryDto } from '@app/models';

export const CategoryIconEnum = {
  food: 'fa-solid fa-burger',
  transport: 'fa-solid fa-bus',
  home: 'fa-solid fa-house-user',
  fun: 'fa-solid fa-masks-theater',
  health: 'fa-solid fa-briefcase-medical',
  rent: 'fa-solid fa-hotel',
  subscription: 'fa-brands fa-youtube',
  restaurant: 'fa-solid fa-utensils',
  credit: 'fa-solid fa-credit-card',
  default: 'fa-solid fa-circle-question'
};

export class Category implements CategoryDto {
  id: number;
  name: string;
  icon: string;

  constructor(cat: CategoryDto) {
    this.id = cat.id;
    this.name = cat.name;

    this.parseIcon();
  }

  parseIcon() {
    this.icon = CategoryIconEnum[this.name];
    if (!this.icon) {
      this.icon = CategoryIconEnum.default;
    }
  }
}
