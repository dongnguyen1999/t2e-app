/// <reference types="vite-plugin-svgr/client" />
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { init } from '@/init.ts';
import { Root } from '@/components/Root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './index.css';
// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

import '@fontsource/comfortaa';
import '@fontsource/dm-mono'; // Defaults to weight 400
import '@fontsource/dm-mono/400.css'; // Specify weight
import '@fontsource/dm-mono/400-italic.css'; // Specify weight and style
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { Pages } from './constants/enums.ts';

// Configure all application dependencies.
console.warn('Location pathname', window.location.pathname);

if (!window.location.pathname.startsWith(Pages.ADMIN)) init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
);
