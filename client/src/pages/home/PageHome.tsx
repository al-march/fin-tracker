import { Component, createSignal, For, onMount } from 'solid-js';
import { transactionsApi } from '@app/services/api';
import { TransactionDto } from '@app/models';
import { TransactionItem } from '@app/components/transaction';

export const PageHome: Component = () => {

  const [trans, setTrans] = createSignal<TransactionDto[]>([]);

  onMount(async () => {
    const trans = await getTrans();
    setTrans(trans);
  });

  const getTrans = async () => {
    const res = await transactionsApi.getAll();
    return res.data;
  };



  return (
    <section class="p-2">
      <div class="flex flex-col gap-4 max-w-lg">
        <h2 class="text-4xl">List of transactions</h2>
        <span class="divider"></span>
        <For each={trans()}>
          {tr => (
            <TransactionItem
              transaction={tr}>
            </TransactionItem>
          )}
        </For>
      </div>
    </section>
  );
};
