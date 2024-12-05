/// <reference types="vite-plugin-svgr/client" />
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
);
