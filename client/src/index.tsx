/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';
import { Router } from 'solid-app-router';
import { AppProvider } from '@app/providers';

render(() =>
    <Router>
      <AppProvider>
        <App/>
      </AppProvider>
    </Router>,
  document.getElementById('root')!
);
