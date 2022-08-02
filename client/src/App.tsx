import type { Component } from 'solid-js';
import { Routing } from './Routing';
import { Drawer, Header } from '@app/template';

const App: Component = () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main
      style={{height: isSafari ? '-webkit-fill-available' : '100vh'}}
      class="main"
    >
      <Header/>

      <Drawer>
        <section class="overflow-hidden">
          <Routing/>
        </section>
      </Drawer>
    </main>
  );
};

export default App;
