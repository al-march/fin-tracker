import type { Component } from 'solid-js';
import { Routing } from './Routing';

const App: Component = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main
      style={{height: isSafari ? '-webkit-fill-available' : '100vh'}}
      class="main"
    >
      <header class="navbar bg-base-200">
        <div class="flex-1">
          <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>
      </header>

      <section class="overflow-hidden">
        <Routing/>
      </section>
    </main>
  );
};

export default App;
