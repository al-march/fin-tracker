import { Component } from 'solid-js';
import { Button, FormError, FormField, Input } from '@solsy/ui';
import { useForm } from '@app/services/hooks/form';
import { authApi } from '@app/services/api';
import { useApp } from '@app/providers';
import { useNavigate } from 'solid-app-router';

type Form = {
  email: string;
  password: string;
}

const Required = (v: any) => v ? '' : 'Required field';

export const PageAuth: Component = () => {
  const navigate = useNavigate();
  const app = useApp();
  const {register, errors, handleSubmit} = useForm<Form>();

  const onSubmit = async (form: Partial<Form>) => {
    const res = await authApi.signIn(form.email, form.password);
    const {user, token} = res.data;
    app.setAuth(token);
    app.setUser(user);

    navigate('/', {
      replace: true
    });
  };

  return (
    <div class="hero min-h-screen bg-base-200">
      <div class="hero-content max-w-screen-md flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-bold">Login now!</h1>
          <p class="py-6">
            Provident cupiditate voluptatem et in.
            Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <FormField>
              <Input
                placeholder="Email"
                bordered
                {...register('email', [Required])}
                error={!!errors.email}
              />
              <FormError show={!!errors.email}>{errors.email}</FormError>
            </FormField>

            <FormField>
              <Input
                placeholder="Password"
                bordered
                {...register('password', [Required])}
                error={!!errors.password}
              />
              <FormError show={!!errors.password}>{errors.password}</FormError>
            </FormField>

            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>

            <Button color="primary" onClick={() => handleSubmit(onSubmit)}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
