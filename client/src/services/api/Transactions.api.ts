import { ApiRoute, BaseApi } from '@app/services/api/base';
import { TransactionDto } from '@app/models';

@ApiRoute('transaction')
export class TransactionsApi extends BaseApi {
  getAll() {
    return this.get<TransactionDto[]>();
  }

  update(dto: TransactionDto) {
    return this.put<TransactionDto>(dto.id, dto);
  }
}

export const transactionsApi = new TransactionsApi();
