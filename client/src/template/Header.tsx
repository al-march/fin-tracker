import { Component } from 'solid-js';
import { Link } from 'solid-app-router';

export const Header: Component = () => {
  return (
    <header class="navbar bg-base-200">
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
  )
}
