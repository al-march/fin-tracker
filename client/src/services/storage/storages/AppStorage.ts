import { Theme } from '@app/providers';
import { AbstractStorage, StorageKeyEnum } from '@app/services/storage';


type AppStorageState = {
  theme: Theme;
  token: string;
}

class AppStorage extends AbstractStorage<AppStorageState> {}

export const appStorage = new AppStorage(
  localStorage,
  StorageKeyEnum.APP
);
