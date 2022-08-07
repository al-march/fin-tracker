import { CategoryDto } from '@app/models';

export interface TransactionDto {
  id: number;
  category: CategoryDto;
  date: string;
  description: string;
  sum: number;

  createdAt: string;
  updatedAt: string;
}
