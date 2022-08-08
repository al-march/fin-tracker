import { createStore, Store } from 'solid-js/store';
import { createContext, ParentProps, useContext } from 'solid-js';
import { appStorage } from '@app/services/storage';
import { UserDto } from '@app/models';

export type Theme = 'light' | 'business';
export type DrawerState = 'full' | 'min';

export type AppState = {
  user: UserDto | undefined;
  drawer: DrawerState;
  isLogin: boolean;
  theme: Theme;
  token: string;
  loading: boolean;
  headerHeight: number;
}

type AppContextType = {
  state: Store<AppState>;
  setAuth: (token: string) => void;
  setTheme: (theme: Theme) => void;
  setUser: (dto: UserDto) => void;
  setLoading: (state: boolean) => void;
  setHeaderHeight: (value: number) => void;
  setDrawer: (state: DrawerState) => void;
}

export const AppContext = createContext<AppContextType>();

export const AppProvider = (props: ParentProps) => {
  const [state, setState] = createStore<AppState>({
    theme: 'business',
    token: '',
    user: undefined,
    loading: false,
    headerHeight: 0,
    drawer: 'full',

    get isLogin() {
      return !!this.user;
    },
  });

  const setTheme = (t: Theme) => {
    const html = document.documentElement;
    html.setAttribute('data-theme', t);
    setState('theme', t);
    appStorage.set('theme', t);
  };

  const setAuth = (token: string) => {
    appStorage.set('token', token);
    setState('token', token);
  };

  const setUser = (user: UserDto) => {
    appStorage.set('user', user);
    setState('user', user);
  };

  const setLoading = (isLoading: boolean) => {
    if (isLoading === state.loading) {
      return;
    }
    setState('loading', isLoading);
  };

  const setHeaderHeight = (value: number) => {
    setState('headerHeight', value);
  };

  const setDrawer = (state: DrawerState) => {
    setState('drawer', state);
  };

  return (
    <AppContext.Provider value={{
      state,
      setTheme,
      setAuth,
      setUser,
      setLoading,
      setHeaderHeight,
      setDrawer
    }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (ctx) {
    return ctx;
  }
  throw new Error('App context not found');
};
