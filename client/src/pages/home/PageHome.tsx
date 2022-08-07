import { Component, createSignal, For, onMount } from 'solid-js';
import { transactionsApi } from '@app/services/api';
import { TransactionDto } from '@app/models';

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
      <h2>Page home</h2>

      <table class="table my-8 w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Sum</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <For each={trans()}>
            {(tr, i) => (
              <tr>
                <th>{i() + 1}</th>
                <td>{tr.category.name}</td>
                <td>
                  <span class="text-success">+{tr.sum}₽</span>
                </td>
                <td>
                  <div class="flex flex-col">
                    <span>{tr.description}</span>
                    <span>{tr.date}</span>
                  </div>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </section>
  );
};
