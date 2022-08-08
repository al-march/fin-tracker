import { createMemo, createSignal, ParentProps } from 'solid-js';
import { TransactionDto } from '@app/models';
import { Category } from '@app/services/mappers';
import dayjs from 'dayjs';
import { Sum } from './Sum';
import { Button, FormField, Input, Toggle } from '@solsy/ui';
import { Transition } from 'solid-transition-group';

type Props = {
  transaction: TransactionDto;
  categories: Map<number, Category>
}

export const Transaction = (props: ParentProps<Props>) => {
  const [expand, setExpand] = createSignal(false);

  const icon = createMemo(() => {
    const iconId = props.transaction.category.id;
    return props.categories.get(iconId);
  });

  const toggle = () => {
    setExpand(!expand());
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

        <span class="justify-self-end	">
          <Button color="ghost" size="xs" onClick={toggle}>
            <i
              class="fa-solid fa-angle-down transition-transform"
              classList={{'rotate-180': expand()}}
            />
          </Button>
        </span>
      </div>

      <Transition
        appear
        onBeforeEnter={(el) => {
          (el as HTMLElement).style.opacity = '0';
          (el as HTMLElement).style.height = '0';
        }}
        onEnter={(el, done) => {
          const a = el.animate([{
            opacity: 0,
            height: 0 + 'px',
          }, {
            opacity: 1,
            height: el.scrollHeight + 'px'
          }], {
            duration: 120
          });
          a.finished.then(done);
        }}
        onAfterEnter={(el) => {
          (el as HTMLElement).style.opacity = '1';
          (el as HTMLElement).style.height = 'auto';
        }}
        onExit={(el, done) => {
          const a = el.animate([{height: el.scrollHeight + 'px'}, {height: 0}], {
            duration: 120
          });
          a.finished.then(done);
        }}
      >
        {expand() && (
          <div class="overflow-hidden">
            <span class="divider m-0 pt-2"/>
            <div
              class="grid gap-2 items-center py-2"
              style="grid-template-columns: 30px 1fr auto 30px"
            >
              <i></i>
              <div>
                <FormField>
                  <div class="flex gap-1 items-center">
                    <label class="text-sm opacity-75 pb-1">Income</label>
                    <Toggle value={props.transaction.profit} size="sm" color="primary"/>
                  </div>
                </FormField>

                <div
                  class="grid items-center gap-2"
                  style="grid-template-columns: 1fr 80px"
                >
                  <FormField>
                    <label class="text-sm opacity-75 pb-1">Description</label>
                    <Input class="w-full" bordered value={props.transaction.description} size="sm"/>
                  </FormField>

                  <FormField>
                    <label class="text-sm opacity-75 pb-1">Sum</label>
                    <Input bordered value={props.transaction.sum} size="sm"/>
                  </FormField>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
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
