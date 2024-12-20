import { Button, Card, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '@/api/authApi';
import { Pages } from '@/constants';

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      login(values).unwrap().then(() => {
        navigate(Pages.ADMIN);
      });
    },
  });

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={4} sx={{ height: '100vh' }}>
      <Typography variant="title-24-bold" fontWeight="bold" color="text.primary">Login</Typography>
      <Card sx={{ px: 5, py: 10, minWidth: 300 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={5}>
            <Stack spacing={3}>
              <TextField
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
            </Stack>
            <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Card>
    </Stack>
  );
};

export default Login;