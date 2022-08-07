/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';
import { Router } from 'solid-app-router';
import { AppProvider } from '@app/providers';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

render(() =>
    <Router>
      <AppProvider>
        <App/>
      </AppProvider>
    </Router>,
  document.getElementById('root')!
);
