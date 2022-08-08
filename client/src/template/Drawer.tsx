import { JSXElement, ParentProps } from 'solid-js';
import { useApp } from '@app/providers';
import { Link, useLocation } from 'solid-app-router';

export const Drawer = (props: ParentProps) => {
  const app = useApp();
  const router = useLocation();

  return (
    <div
      class="flex w-full"
      style={`height: calc(100vh - ${app.state.headerHeight}px)`}
    >
      <div class="bg-base-300 transition-all" classList={{
        'w-12': app.state.drawer === 'min',
        'w-64': app.state.drawer === 'full',
      }}>
        <ul class="menu overflow-y-auto py-10 w-full text-base-content">
          <MenuItem
            icon={<i class="fa-solid fa-house"/>}
            title={'Home'}
            link="/"
            full={app.state.drawer === 'full'}
            active={router.pathname === '/'}
          />

          <MenuItem
            icon={<i class="fa-solid fa-chalkboard"/>}
            title={'Dashboard'}
            link="/dashboard"
            full={app.state.drawer === 'full'}
            active={router.pathname.includes('dashboard')}
          />

          <MenuItem
            icon={<i class="fa-solid fa-user"/>}
            title={'Profile'}
            link="/profile"
            full={app.state.drawer === 'full'}
            active={router.pathname.includes('profile')}
          />
        </ul>
      </div>

      <div class="w-full flex flex-col items-stretch justify-items-stretch">
        {props.children}
      </div>
    </div>
  );
};

type MenuItemProps = {
  icon: JSXElement;
  title: JSXElement;
  link: string;

  full: boolean;
  active?: boolean;
}

const MenuItem = (props: ParentProps<MenuItemProps>) => {
  return (
    <li class="truncate">
      <Link
        href={props.link}
        class="grid h-12"
        classList={{
          'active': props.active
        }}
        style="grid-template-columns: calc(3em - 2rem) 1fr"
      >
        <span class="flex items-center justify-center">{props.icon}</span>
        <span
          class="transition-opacity"
          classList={{'opacity-0': !props.full}}
        >
            {props.title}
          </span>
      </Link>
    </li>
  );
};
