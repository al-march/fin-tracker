import { createMemo, ParentProps } from 'solid-js';
import { TransactionDto } from '@app/models';
import { Category } from '@app/services/mappers';
import dayjs from 'dayjs';
import { Sum } from './Sum';

type Props = {
  transaction: TransactionDto;
  categories: Map<number, Category>
}

export const Transaction = (props: ParentProps<Props>) => {
  const icon = createMemo(() => {
    const iconId = props.transaction.category.id;
    return props.categories.get(iconId);
  });

  return (
    <div class="card bg-base-200 p-3 w-full rounded">
      <div
        class="grid gap-2 items-center"
        style="grid-template-columns: 60px 1fr auto"
      >

        <span class="flex flex-col items-center justify-center text-xl">
          <i class={icon().icon}/>
        </span>

        <div class="flex flex-col">
          <h5>{props.transaction.description}</h5>
          <Date
            class="opacity-75 text-sm"
            date={props.transaction.date}
          />
        </div>

        <Sum
          sum={props.transaction.sum}
          profit={props.transaction.profit}
        />
      </div>
    </div>
  );
};

export type DateProps = {
  date: string | number;
  class?: string;
}

export const Date = (props: ParentProps<DateProps>) => {
  const format = createMemo(() => dayjs(props.date));
  return <span class={props.class}>{format().fromNow()}</span>;
};
