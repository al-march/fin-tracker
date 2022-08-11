import { createSignal, ParentProps, Show } from 'solid-js';
import { Button } from '@solsy/ui';
import { SlideHeight } from '@app/transitions';
import { EditForm } from '@app/components/transaction';
import { TransactionDto } from '@app/models';

const createEmptyDto = () => ({
  category: {
    id: 10,
    name: 'other'
  },
  createdAt: '',
  date: '',
  description: '',
  id: 0,
  profit: false,
  sum: 0,
  updatedAt: ''
});

type Props = {
  onCreate?: (dto: TransactionDto) => void;
}

export const AddNewTrForm = (props: ParentProps<Props>) => {
  const [dto, setDto] = createSignal<TransactionDto | null>(null);

  const startCreating = () => {
    setDto(createEmptyDto());
  };

  const endCreating = () => {
    setDto(null);
  };

  const onCreate = (dto: TransactionDto) => {
    endCreating();
    props.onCreate?.(dto);
  };

  return (
    <>
      <Show when={!dto()} fallback={
        <Button onClick={endCreating}>Cancel</Button>
      }>
        <Button onClick={startCreating}>New</Button>
      </Show>

      <SlideHeight duration={120}>
        {dto() && (
          <div class="overflow-hidden">
            <EditForm
              tr={dto()}
              onSubmit={onCreate}
            />
          </div>
        )}
      </SlideHeight>
    </>
  );
};
