import { batch, onMount } from 'solid-js';
import { categoryApi, transactionsApi } from '@app/services/api';
import { createStore } from 'solid-js/store';
import { CategoriesMap, Category } from '@app/services/mappers';
import { TransactionCreateDto, TransactionDto } from '@app/models';
import dayjs from 'dayjs';
import { TransactionList } from './components/TransactionList';
import { TransactionChart } from './components/TransactionChart';

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

  const updateTransaction = async (dto: TransactionDto) => {
    const res = await transactionsApi.update(dto);
    const list = [...state.transactions];
    const index = list.findIndex(tr => tr.id === res.data.id);
    if (index >= 0) {
      list[index] = res.data;
    }
    setTransactions(list);
  };

  return (
    <section class="p-4 h-full overflow-hidden flex flex-col">
      <h2 class="text-4xl py-4">List of transactions</h2>
      <div class="grid grid-cols-12 gap-8 flex-1 overflow-hidden">
        <div class="col-start-1 col-end-6 flex flex-col overflow-y-scroll">
          <TransactionList
            transactions={state.transactions}
            categories={state.categories}
            onCreate={createTransaction}
            onUpdate={updateTransaction}
          />
        </div>

        <div class="col-start-6 col-end-12 pb-8">
          <TransactionChart
            transactions={state.transactions}
          />
        </div>
      </div>
    </section>
  );
};
