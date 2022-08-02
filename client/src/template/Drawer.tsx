import { ParentProps } from 'solid-js';
import { useApp } from '@app/providers';

export const Drawer = (props: ParentProps) => {
  const app = useApp();

  const getHeight = () => `height: calc(100vh - ${app.state.headerHeight}px)`

  return (
    <div class="drawer drawer-mobile" style={getHeight()}>
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
      <div class="drawer-content flex flex-col items-stretch justify-items-stretch">
        {props.children}
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

      </div>
      <div class="drawer-side bg-base-300">
        <label for="my-drawer-2" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-60 text-base-content">
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  );
};
