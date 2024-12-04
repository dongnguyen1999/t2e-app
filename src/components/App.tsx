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
import { Pages } from '@/constants/enums';

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="t2e-app/app" element={<Layout />}>
            <Route index element={<Navigate to={Pages.HOME} />} />
            <Route path="home" element={<Home />} />
            <Route path="missions" element={<Missions />} />
            <Route path="friends" element={<Friends />} />
            <Route path="*" element={<Navigate to={Pages.HOME} />} />
          </Route>
          <Route path="t2e-app/login" element={<Login />} />
          <Route path="t2e-app/logout" element={<Logout />} />
          <Route path="t2e-app/admin" element={<AdminLayout />}>
            <Route index element={<AdminUsers />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="missions" element={<AdminMissions />} />
            <Route path="*" element={<Navigate to={Pages.ADMIN_USERS} />} />
          </Route>
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<Navigate to={Pages.HOME} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}