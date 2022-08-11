import { createMemo, createSignal, ParentProps } from 'solid-js';
import { TransactionDto } from '@app/models';
import { Category } from '@app/services/mappers';
import dayjs from 'dayjs';
import { Sum } from './Sum';
import { Button } from '@solsy/ui';
import { ExpandPanel } from './ExpandPanel';

type Props = {
  transaction: TransactionDto;
  categories: Map<number, Category>;
  expand?: boolean;

  onUpdate?: (dto: TransactionDto) => void;
}

export const Transaction = (props: ParentProps<Props>) => {
  const [expand, setExpand] = createSignal(!!props.expand);
  const [tr, setTr] = createSignal(props.transaction);

  const icon = createMemo(() => {
    const iconId = tr().category.id;
    return props.categories.get(iconId);
  });

  const toggle = () => {
    setExpand(!expand());
  };

  const onChangeDto = (dto: TransactionDto) => {
    setTr({...dto});
  };

  const onUpdateDto = (dto: TransactionDto) => {
    props.onUpdate?.(dto);
  };

  return (
    <div class="card bg-base-200 p-3 w-full rounded">
      <div
        class="grid gap-2 items-center"
        style="grid-template-columns: 30px 1fr auto 30px"
      >
        <span class="flex flex-col items-center justify-center text-xl">
          <i class={icon().icon}/>
        </span>

        <div class="flex flex-col">
          <h5>{tr().description}</h5>
          <Date
            class="opacity-75 text-sm"
            date={tr().date}
          />
        </div>

        <Sum
          sum={tr().sum}
          profit={tr().profit}
        />

        <span class="justify-self-end	">
          <Button color="ghost" size="xs" onClick={toggle}>
            <i
              class="fa-solid fa-angle-down transition-transform"
              classList={{'rotate-180': expand()}}
            />
          </Button>
        </span>
      </div>

      <ExpandPanel
        expand={expand()}
        tr={tr()}
        onChange={onChangeDto}
        onSubmit={onUpdateDto}
      />
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
