import { CategoryDto } from '@app/models';

export interface TransactionDto {
  id: number;
  category: CategoryDto;
  date: string;
  description: string;
  sum: number;
  profit: boolean;

  createdAt: string;
  updatedAt: string;
}

export type TransactionCreateDto = Pick<TransactionDto,
  'profit'
  | 'description'
  | 'sum'
  | 'date'
  | 'category'>
