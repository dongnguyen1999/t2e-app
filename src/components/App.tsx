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
import { Pages } from '@/constants';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminMissions from '@/pages/admin/AdminMissions';
import AdminDashboard from '@/pages/admin/AdminDashboard';

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<Layout />}>
            <Route index element={<Navigate to={Pages.HOME} />} />
            <Route path="home" element={<Home />} />
            <Route path="missions" element={<Missions />} />
            <Route path="friends" element={<Friends />} />
            <Route path="*" element={<Navigate to={Pages.HOME} />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<Navigate to={Pages.DASHBOARD} />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="missions" element={<AdminMissions />} />
            <Route path="*" element={<Navigate to={Pages.DASHBOARD} />} />
          </Route>
          <Route path="forbidden" element={<Forbidden />} />
          <Route path="*" element={<Navigate to={Pages.LOGIN} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}