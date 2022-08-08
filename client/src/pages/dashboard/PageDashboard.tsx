import { batch, createSignal, For, onMount } from 'solid-js';
import { TransactionItem } from '@app/components/transaction';
import { Category } from '@app/services/mappers';
import { TransactionDto } from '@app/models';
import { categoryApi, transactionsApi } from '@app/services/api';

export const PageDashboard = () => {
  const [cats, setCats] = createSignal<Map<number, Category>>(new Map<number, Category>());
  const [trans, setTrans] = createSignal<TransactionDto[]>([]);

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

  return (
    <section class="p-2">
      <div class="flex flex-col gap-4 max-w-lg">
        <h2 class="text-4xl">List of transactions</h2>
        <span class="divider"></span>
        <For each={trans()}>
          {tr => (
            <TransactionItem
              transaction={tr}
              categories={cats()}>
            </TransactionItem>
          )}
        </For>
      </div>
    </section>
  );
};
