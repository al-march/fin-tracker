import { Button, FormField, Input } from '@solsy/ui';
import { useForm } from '@app/services/hooks/form';
import { createEffect, createSignal, onMount } from 'solid-js';
import { UserDto } from '@app/models';
import { profileApi } from '@app/services/api';
import { useApp } from '@app/providers';

type FormControls = {
  firstname: string;
  surname: string;
  email: string;
}

export const PageProfile = () => {
  const app = useApp();
  const [user, setUser] = createSignal<UserDto>();
  const {register, setValue, handleSubmit} = useForm<FormControls>();

  onMount(async () => {
    const res = await profileApi.getInfo();
    setUser(res.data);
  });

  createEffect(() => {
    const u = user();
    if (u) {
      setValue('firstname', u.firstname);
      setValue('surname', u.surname);
      setValue('email', u.email);
    }
  });

  const onSubmit = async (form: FormControls) => {
    const res = await profileApi.update(form);
    const user = res.data;

    app.setUser(user);
  };

  return (
    <section class="p-2">
      <div class="flex flex-col gap-4 max-w-lg">
        <h2 class="text-4xl">Profile</h2>
        <span class="divider"/>

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
      </div>
    </section>
  );
};
