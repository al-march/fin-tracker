import type { Component } from 'solid-js';
import { Routing } from './Routing';
import { Header } from '@app/template';

const App: Component = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main
      style={{height: isSafari ? '-webkit-fill-available' : '100vh'}}
      class="main"
    >
      <Header/>

      <section class="overflow-hidden">
        <Routing/>
      </section>
    </main>
  );
};

export default App;
