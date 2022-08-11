import { TransactionList } from './components/TransactionList';
import { batch, onMount } from 'solid-js';
import { categoryApi, transactionsApi } from '@app/services/api';
import { createStore } from 'solid-js/store';
import { CategoriesMap, Category } from '@app/services/mappers';
import { TransactionCreateDto, TransactionDto } from '@app/models';
import dayjs from 'dayjs';

interface DashboardState {
  categories: CategoriesMap;
  transactions: TransactionDto[];
}

export const PageDashboard = () => {

  const [state, setState] = createStore<DashboardState>({
    categories: new Map<number, Category>(),
    transactions: [],
  });

  onMount(async () => {
    const categories = await getCategories();
    const transactions = await getTransactions();

    batch(() => {
      setCategories(categories);
      setTransactions(transactions);
    });
  });

  const getTransactions = async () => {
    const res = await transactionsApi.getAll();
    return res.data;
  };

  const getCategories = () => {
    return categoryApi.getAll();
  };

  const setCategories = (categories: CategoriesMap) => {
    setState('categories', categories);
  };

  const setTransactions = (transactions: TransactionDto[]) => {
    setState('transactions', transactions);
  };

  const createTransaction = async (dto: TransactionDto) => {
    const createDto: TransactionCreateDto = {
      date: dayjs().toJSON(),
      description: dto.description,
      category: dto.category,
      profit: dto.profit,
      sum: dto.sum
    };

    const res = await transactionsApi.create(createDto);
    const transactions = [res.data, ...state.transactions];
    setTransactions(transactions);
  };

  return (
    <section class="p-4">
      <div class="grid grid-cols-3">
        <TransactionList
          transactions={state.transactions}
          categories={state.categories}
          onCreate={createTransaction}
        />
      </div>
    </section>
  );
};
