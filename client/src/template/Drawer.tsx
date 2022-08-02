import { JSXElement, ParentProps } from 'solid-js';
import { useApp } from '@app/providers';

type MenuItemProps = {
  icon: JSXElement;
  title: JSXElement;
}

export const Drawer = (props: ParentProps) => {
  const app = useApp();

  const MenuItem = (props: ParentProps<MenuItemProps>) => {
    return (
      <li class="truncate">
        <a class="grid h-12" style="grid-template-columns: calc(3em - 2rem) 1fr">
          <span class="flex items-center justify-center">{props.icon}</span>
          <span
            class="transition-opacity"
            classList={{'opacity-0': app.state.drawer === 'min'}}
          >
            {props.title}
          </span>
        </a>
      </li>
    );
  };

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
            icon={<i class="fa-solid fa-chalkboard"/>}
            title={'Dashboard'}
          />
          <MenuItem
            icon={<i class="fa-solid fa-user"/>}
            title={'Profile'}
          />
        </ul>
      </div>

      <div class="w-full flex flex-col items-stretch justify-items-stretch">
        {props.children}
      </div>
    </div>
  );
};
