import { TransactionDto } from '@app/models';
import { ParentProps } from 'solid-js';
import { SlideHeight } from '@app/transitions';
import { EditForm } from './EditForm';

export type TranPanel = {
  tr: TransactionDto;
  expand: boolean;
  onChange?: (dto: TransactionDto) => void;
  onSubmit?: (dto: TransactionDto) => void;
}

export const ExpandPanel = (props: ParentProps<TranPanel>) => {
  return (
    <SlideHeight duration={120}>
      {props.expand && (
        <div class="overflow-hidden">
          <span class="divider m-0 pt-2"/>

          <EditForm
            tr={props.tr}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
          />
        </div>
      )}
    </SlideHeight>
  );
};
