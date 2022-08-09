import { createEffect, createMemo, createSignal, on, ParentProps } from 'solid-js';
import { CategoryDto, TransactionDto } from '@app/models';
import { Button, FormError, FormField, Input, Toggle } from '@solsy/ui';
import { OnlyNumber, Required, useForm } from '@app/services/hooks/form';
import { CategorySelect } from '@app/components/category';
import { Category } from '@app/services/mappers';

type Props = {
  tr: TransactionDto;
  onChange?: (dto: TransactionDto) => void;
  onSubmit?: (dto: TransactionDto) => void;
}

type Controls = {
  description: string;
  sum: number;
  profit: boolean;
}

export const EditForm = (props: ParentProps<Props>) => {
  const [editedDto, setDto] = createSignal<TransactionDto>(props.tr);
  const {register, setValue, errors, watch, isValid, handleSubmit} = useForm<Controls>();

  const tr = createMemo(() => props.tr);

  createEffect(on(tr, (tr) => {
    if (tr) {
      setValue('description', tr.description);
      setValue('sum', tr.sum);
      setValue('profit', tr.profit);
    }
  }));

  watch().subscribe(form => {
    const dto = Object.assign(tr(), form);
    if (isValid() && props.onChange) {
      dto.sum = Number(dto.sum);
      setDto(dto);
      props.onChange(editedDto());
    }
  });

  const onSave = () => {
    props.onSubmit(editedDto());
  };

  const catChange = (cat: Category) => {
    const category: CategoryDto = {id: cat.id, name: cat.name};
    setDto({...editedDto(), category});
    props.onChange(editedDto());
  };

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      class="grid gap-2 items-center py-2"
      style="grid-template-columns: 30px 1fr auto 30px"
    >
      <i/>
      <div>
        <div class="grid md:grid-cols-2 items-center md:gap-2">
          <FormField>
            <label class="text-sm opacity-75 pb-1">Description</label>
            <Input
              class="flex-1"
              bordered
              size="sm"
              {...register('description', [Required()])}
              error={errors.description}
            />
            <FormError show={!!errors.description}>{errors.description}</FormError>
          </FormField>

          <FormField>
            <label class="text-sm opacity-75 pb-1">Sum</label>
            <Input
              class="flex-1"
              bordered
              size="sm"
              {...register('sum', [Required(), OnlyNumber()])}
              error={errors.sum}
            />
            <FormError show={!!errors.sum}>{errors.sum}</FormError>
          </FormField>
        </div>

        <FormField>
          <label class="text-sm opacity-75 pb-1">Income</label>
          <Toggle
            size="sm"
            color="primary"
            {...register('profit')}
          />
        </FormField>

        <FormField>
          <label class="text-sm opacity-75 pb-1">Category</label>
          <CategorySelect
            bordered
            size="sm"
            id={tr().category.id}
            onCategoryChange={catChange}
          />
        </FormField>

        <div class="flex justify-end">
          <Button color="primary" size="sm" class="gap-2" type="submit">
            <i class="fa-solid fa-save"/>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};
