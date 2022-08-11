import { batch, createMemo, createSignal, For, onMount } from 'solid-js';
import { Sum, Transaction } from '@app/components/transaction';
import { Category } from '@app/services/mappers';
import { TransactionCreateDto, TransactionDto } from '@app/models';
import { categoryApi, transactionsApi } from '@app/services/api';
import { AddNewTrForm } from '@app/pages/dashboard/components/NewTransactionForm';
import dayjs from 'dayjs';

export const PageDashboard = () => {
  const [cats, setCats] = createSignal<Map<number, Category>>(new Map<number, Category>());
  const [trans, setTrans] = createSignal<TransactionDto[]>([]);

  const incomeSum = createMemo(() => {
    return trans()
      .filter(c => c.profit)
      .reduce((acc, tr) => {
        acc += tr.sum;
        return acc;
      }, 0);
  });

  const outcomeSum = createMemo(() => {
    return trans()
      .filter(c => !c.profit)
      .reduce((acc, tr) => {
        acc += tr.sum;
        return acc;
      }, 0);
  });

  onMount(async () => {
    const cats = await getCats();
    const trans = await getTrans();

    batch(() => {
      setCats(cats);
      setTrans(trans);
    });
  });

  const getTrans = async () => {
    const res = await transactionsApi.getAll();
    return res.data;
  };

  const getCats = () => {
    return categoryApi.getAll();
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
    setTrans((trs) => [res.data, ...trs]);
  };

  return (
    <section class="p-4">
      <div class="flex flex-col gap-4 max-w-lg mx-auto">
        <h2 class="text-4xl py-4">List of transactions</h2>
        <div class="flex justify-between">
          <p class="flex flex-col items-start">
            <span>Income:</span>
            <Sum sum={incomeSum()} profit={true}/>
          </p>
          <p class="flex flex-col items-end">
            <span>Outcome:</span>
            <Sum sum={outcomeSum()} profit={false}/>
          </p>
        </div>

        <AddNewTrForm onCreate={createTransaction}/>

        <For each={trans()}>
          {tr => (
            <Transaction
              transaction={tr}
              categories={cats()}>
            </Transaction>
          )}
        </For>
      </div>
    </section>
  );
};
