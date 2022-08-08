import { createSignal, onMount } from 'solid-js';
import { UserDto } from '@app/models';
import { profileApi } from '@app/services/api';
import { useApp } from '@app/providers';

import { ProfileForm, ProfileFormControls, SettingsForm, SettingsFormControls } from './components';

export const PageProfile = () => {
  const app = useApp();
  const [user, setUser] = createSignal<UserDto>();

  onMount(async () => {
    const res = await profileApi.getInfo();
    setUser(res.data);
  });

  const onProfileSubmit = async (form: ProfileFormControls) => {
    const res = await profileApi.update(form);
    const user = res.data;

    app.setUser(user);
  };

  const onSettingsSubmit = async (form: SettingsFormControls) => {
    const res = await profileApi.updateSettings(form);
    const user = {...app.state.user};
    user.settings = res.data;
    app.setUser(user);
  };

  return (
    <section class="p-2">
      <div class="grid md:grid-cols-2 gap-2">
        <div class="flex flex-col gap-4 max-w-lg">
          <h2 class="text-4xl py-4">Profile</h2>

          <ProfileForm
            user={user()}
            onSubmit={onProfileSubmit}
          />
        </div>

        <div class="flex flex-col gap-4 max-w-lg">
          <h2 class="text-4xl py-4">Settings</h2>

          <SettingsForm
            user={user()}
            onSubmit={onSettingsSubmit}
          />
        </div>
      </div>
    </section>
  );
};
