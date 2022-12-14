import { DrawerState, Theme } from '@app/providers';
import { AbstractStorage, StorageKeyEnum } from '@app/services/storage';
import { UserDto } from '@app/models';


type AppStorageState = {
  theme: Theme;
  token: string;
  user: UserDto | null;
  drawer: DrawerState;
}

class AppStorage extends AbstractStorage<AppStorageState> {}

export const appStorage = new AppStorage(
  localStorage,
  StorageKeyEnum.APP
);
