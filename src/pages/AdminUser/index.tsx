import { useMemo } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  MRT_Row,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import { User } from '@/api/userApi';
import * as yup from 'yup';
import { FormikAction } from '@/constants/enums';

const initialUsers: User[] = [
  { id: '7154169793', username: 'dongnguyen1299', first_name: 'Dong', last_name: 'Nguyen', auth_date: 1730814073 },
];

const validationSchema = yup.object().shape({
  username: yup.string().required('Required'),
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  password: yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
});

const AdminUsers = () => {

  const formik = useFormik<User>({
    initialValues: {
      id: '',
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      auth_date: 0,
    },
    validationSchema,
    onSubmit: values => {
      console.warn('formik.onSubmit', values);
    }
  });

  const handleCreateUser = async ({ exitCreatingMode }: { exitCreatingMode: () => void; values: User }) => {
    try {
      // await createUser(values);
      formik.setFieldValue('action', FormikAction.CREATE);
      formik.submitForm();
      exitCreatingMode();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveUser = async ({ exitEditingMode }: { exitEditingMode: () => void; row: MRT_Row<User>; values: User }) => {
    try {
      // await updateUser(updatedUser);
      formik.setFieldValue('action', FormikAction.UPDATE);
      formik.submitForm();
      exitEditingMode();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = (row: MRT_Row<User>) => {
    // setDeleteConfirmModalOpen(false);
    console.warn('handleDeleteUser', row);
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.username && formik.touched.username,
          helperText: formik.touched.username && formik.errors.username,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.first_name && formik.touched.first_name,
          helperText: formik.touched.first_name && formik.errors.first_name,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.last_name && formik.touched.last_name,
          helperText: formik.touched.last_name && formik.errors.last_name,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'password',
        header: 'Password',
        Cell: () => 'Hash Password',
        muiEditTextFieldProps: {
          required: true,
          type: 'password',
          error: !!formik.errors.password && formik.touched.password,
          helperText: formik.touched.password && formik.errors.password,
          onChange: formik.handleChange,
        }
      }
    ],
    [formik.errors, formik.touched],
  );

  const table = useMaterialReactTable({
    columns,
    data: initialUsers,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: row => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => formik.resetForm(),
    onEditingRowSave: props => handleSaveUser(props),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => {
            formik.resetForm({
              values: row.original
            });
            table.setEditingRow(row);
          }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDeleteUser(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        sx={{
          mx: 2,
          my: 3
        }}
      >
        Create New User
      </Button>
    ),
    state: {},
  });

  return <Box sx={{
    '.MuiTableContainer-root': {
      minHeight: '75vh',
    }
  }}>
    <MaterialReactTable table={table} />
  </Box>;
};

export default AdminUsers;
