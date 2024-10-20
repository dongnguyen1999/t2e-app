import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import theme from '@/themes/default';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Missions from '@/pages/Missions';
import Friends from '@/pages/Friends';

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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" />} />
              <Route path="home" element={<Home />} />
              <Route path="missions" element={<Missions />} />
              <Route path="friends" element={<Friends />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Route>
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>;
    </AppRoot>
  );
}