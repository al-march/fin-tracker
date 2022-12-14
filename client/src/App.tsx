import type { Component } from 'solid-js';
import { Routing } from './Routing';
import { Drawer, Header } from '@app/template';
import { appStorage } from '@app/services/storage';
import { useApp } from '@app/providers';
import { useNavigate } from 'solid-app-router';

const App: Component = () => {
  initApp();
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return (
    <main
      style={{height: isSafari ? '-webkit-fill-available' : '100vh'}}
      class="main"
    >
      <Header/>

      <Drawer>
        <section class="overflow-hidden overflow-y-scroll">
          <Routing/>
        </section>
      </Drawer>
    </main>
  );
};

function initApp() {
  const app = useApp();
  const navigate = useNavigate();

  const token = appStorage.get('token');
  const user = appStorage.get('user');
  const drawer = appStorage.get('drawer');

  app.setAuth(token);
  app.setUser(user);
  app.setDrawer(drawer);

  if (!token) {
    navigate('/auth');
  }
}

export default App;
