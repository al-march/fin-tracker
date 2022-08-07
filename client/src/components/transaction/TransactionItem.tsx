import { createMemo, ParentProps } from 'solid-js';
import { TransactionDto } from '@app/models';
import dayjs from 'dayjs';

type Props = {
  transaction: TransactionDto;
}

export const TransactionItem = (props: ParentProps<Props>) => {
  return (
    <div class="card bg-base-200 p-3 w-full rounded">
      <div
        class="grid gap-2 items-center"
        style="grid-template-columns: 50px 1fr auto"
      >

        <span>{props.transaction.category.name}</span>

        <div class="flex flex-col">
          <h5>{props.transaction.description}</h5>
          <Date
            class="opacity-75 text-sm"
            date={props.transaction.date}
          />
        </div>

        <Sum tr={props.transaction}/>
      </div>
    </div>
  );
};

type SumProps = {
  tr: TransactionDto;
}

export const Sum = (props: ParentProps<SumProps>) => {

  const formatSumNumber = createMemo(() => {
    const sum = props.tr.sum.toString();

    if (sum.length <= 4) {
      return sum;
    }

    const output = sum.split('').reverse();
    for (let i = 3; i < output.length; i += 3) {
      output[i] = output[i] + ' ';
    }

    return output.reverse().join('');
  });

  const formatSum = createMemo(() => {
    return `${props.tr.profit ? '+' : '-'}${formatSumNumber()} ₽`;
  });

  return (
    <span classList={{
      'text-success': props.tr.profit,
      'text-error': !props.tr.profit,
    }}>
      {formatSum()}
    </span>
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
