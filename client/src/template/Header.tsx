import { Component, createEffect, createSignal } from 'solid-js';
import { Link } from 'solid-app-router';
import { useApp } from '@app/providers';

export const Header: Component = () => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const app = useApp();

  createEffect(() => {
    const height = ref().scrollHeight;
    app.setHeaderHeight(height);
  });

  return (
    <header class="navbar bg-base-200" ref={setRef}>
      <div class="flex-1">
        <Link href="" class="btn btn-ghost normal-case text-xl">
          <span class="font-normal space-x-2 tracking-wide">FinTrack</span>
        </Link>
      </div>

      <div class="flex-none">
        <Link href="/auth" class="btn btn-ghost btn-sm normal-case text-sm">
          Login
        </Link>
      </div>
    </header>
  );
};
