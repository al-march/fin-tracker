import { Button, FormField, Input } from '@solsy/ui';
import { useForm } from '@app/services/hooks/form';
import { createEffect, createMemo, on, ParentProps } from 'solid-js';
import { UserDto } from '@app/models';

type Props = {
  user: UserDto;
  onSubmit: (ctrl: ProfileFormControls) => void;
}

export type ProfileFormControls = {
  firstname: string;
  surname: string;
  email: string;
}

export const ProfileForm = (props: ParentProps<Props>) => {
  const {register, setValue, handleSubmit} = useForm<ProfileFormControls>();

  const user = createMemo(() => props.user);

  createEffect(on(user, (user) => {
    if (user) {
      setValue('firstname', user.firstname);
      setValue('surname', user.surname);
      setValue('email', user.email);
    }
  }));

  const onSubmit = async (form: ProfileFormControls) => {
    props.onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Input
          placeholder="Firstname"
          bordered
          {...register('firstname')}
        />
      </FormField>

      <FormField>
        <Input
          placeholder="Surname"
          bordered
          {...register('surname')}
        />
      </FormField>

      <FormField>
        <Input
          placeholder="Email"
          bordered
          {...register('email')}
        />
      </FormField>

      <Button color="primary" type="submit">Submit</Button>
    </form>
  );
};
