import { Button, FormError, FormField, Input } from '@solsy/ui';
import { useForm } from '@app/services/hooks/form';
import { UserDto } from '@app/models';
import { createEffect, createMemo, on, ParentProps } from 'solid-js';

export type SettingsFormControls = {
  monthIncome: number;
  monthOutcome: number;
}

type Props = {
  user: UserDto;
  onSubmit: (form: SettingsFormControls) => void;
}

const IsNumber = (v: any) => {
  const isNumber = !isNaN(Number(v));
  return isNumber ? null : 'Must be number and > 0';
}

export const SettingsForm = (props: ParentProps<Props>) => {
  const {register, setValue, handleSubmit, errors} = useForm<SettingsFormControls>();

  const user = createMemo(() => props.user);

  const onSubmit = (form: SettingsFormControls) => {
    const toNumber: SettingsFormControls = {
      monthIncome: Number(form.monthIncome),
      monthOutcome: Number(form.monthOutcome),
    };
    props.onSubmit(toNumber);
  };

  createEffect(on(user, (user) => {
    if (user) {
      setValue('monthIncome', user.settings.monthIncome);
      setValue('monthOutcome', user.settings.monthOutcome);
    }
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Input
          placeholder="Income"
          bordered
          {...register('monthIncome', [IsNumber])}
          error={!!errors.monthIncome}
        />
        <FormError show={!!errors.monthIncome}>{errors.monthIncome}</FormError>
      </FormField>

      <FormField>
        <Input
          placeholder="Outcome"
          bordered
          {...register('monthOutcome', [IsNumber])}
          error={!!errors.monthOutcome}
        />
        <FormError show={!!errors.monthOutcome}>{errors.monthOutcome}</FormError>
      </FormField>

      <Button color="primary" type="submit">Submit</Button>
    </form>
  );
};
