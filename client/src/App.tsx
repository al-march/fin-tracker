import type { Component } from 'solid-js';
import { Routing } from './Routing';
import { Link } from 'solid-app-router';

const App: Component = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main
      style={{height: isSafari ? '-webkit-fill-available' : '100vh'}}
      class="main"
    >
      <header class="navbar bg-base-200">
        <div class="flex-1">
          <Link href="" class="btn btn-ghost normal-case text-xl">
            daisyUI
          </Link>
        </div>

        <div class="flex-none">
          <Link href="/auth" class="btn btn-ghost btn-sm normal-case text-sm">
            Login
          </Link>
        </div>
      </header>

      <section class="overflow-hidden">
        <Routing/>
      </section>
    </main>
  );
};

export default App;
