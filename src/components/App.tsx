import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';
import theme from '@/themes/default';
import { CssBaseline, ThemeProvider } from '@mui/material';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <HashRouter>
          <Routes>
            {routes.map((route) => <Route key={route.path} {...route} />)}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>;
    </AppRoot>
  );
}