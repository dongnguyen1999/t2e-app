import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import theme from '@/themes/default';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Missions from '@/pages/Missions';
import Friends from '@/pages/Friends';
import Forbidden from '@/pages/Layout/components/Forbidden';
import AdminLayout from '@/pages/Layout/AdminLayout';
import Login from '@/pages/Layout/components/Login';
import Logout from '@/pages/Layout/components/Logout';
import AdminMissions from '@/pages/AdminMissions';
import AdminUsers from '@/pages/AdminUser';

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
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminUsers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="missions" element={<AdminMissions />} />
              <Route path="*" element={<Navigate to="/admin/users" />} />
            </Route>
            <Route path="forbidden" element={<Forbidden />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>;
    </AppRoot>
  );
}