import { createEffect, createMemo, createSignal, For, ParentProps } from 'solid-js';
import { Sum, Transaction } from '@app/components/transaction';
import { AddNewTrForm } from '@app/pages/dashboard/components/NewTransactionForm';
import { TransactionDto } from '@app/models';
import { CategoriesMap } from '@app/services/mappers';

type Props = {
  transactions?: TransactionDto[];
  categories?: CategoriesMap;
  onCreate?: (dto: TransactionDto) => void;
}

export const TransactionList = (props: ParentProps<Props>) => {
  const [transactions, setTransactions] = createSignal<TransactionDto[]>(props.transactions || []);
  const [categories, setCategories] = createSignal<CategoriesMap>(props.categories || new Map());

  createEffect(() => {
    setTransactions(props.transactions);
    setCategories(props.categories);
  });

  const incomeSum = createMemo(() => {
    return transactions()
      .filter(c => c.profit)
      .reduce((acc, tr) => {
        acc += tr.sum;
        return acc;
      }, 0);
  });

  const outcomeSum = createMemo(() => {
    return transactions()
      .filter(c => !c.profit)
      .reduce((acc, tr) => {
        acc += tr.sum;
        return acc;
      }, 0);
  });

  const onCreate = (dto: TransactionDto) => {
    props.onCreate?.(dto);
  };

  return (
    <div class="flex flex-col gap-4">
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

      <AddNewTrForm
        onCreate={onCreate}
      />

      <For each={transactions()}>
        {tr => (
          <Transaction
            transaction={tr}
            categories={categories()}>
          </Transaction>
        )}
      </For>
    </div>
  );
};
