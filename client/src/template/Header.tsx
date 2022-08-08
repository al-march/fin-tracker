import { Component, createEffect, createSignal, Show } from 'solid-js';
import { Link } from 'solid-app-router';
import { DrawerState, useApp } from '@app/providers';

export const Header: Component = () => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const app = useApp();

  createEffect(() => {
    const height = ref().scrollHeight;
    app.setHeaderHeight(height);
  });

  const toggleDrawer = () => {
    const state = app.state.drawer;
    const newState: DrawerState = state === 'full'
      ? 'min'
      : 'full';

    app.setDrawer(newState);
  };

  return (
    <header class="navbar bg-base-200" ref={setRef}>
      <div class="flex-1">
        <button class="btn btn-ghost" onClick={toggleDrawer}>
          <i
            classList={{'rotate-180': app.state.drawer === 'min'}}
            class="fa-solid fa-angle-left transition-transform"
          />
        </button>
        <Link href="" class="btn btn-ghost normal-case text-xl">
          <span class="font-normal space-x-2 tracking-wide">FinTrack</span>
        </Link>
      </div>

      <div class="flex-none">
        <Show when={!app.state.user}>
          <Link href="/auth" class="btn btn-ghost btn-sm normal-case text-sm">
            Login
          </Link>
        </Show>
      </div>
    </header>
  );
};
