import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from 'material-react-table';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useCreateUserMutation, useLazySearchUsersQuery, User } from '@/api/userApi';
import * as yup from 'yup';
import { FormikAction } from '@/constants';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';
import moment from 'moment';
import { debounce, get } from 'lodash';
import showConfirm from '@/components/ConfirmAlert';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/components/GlobalSnackbar/reducer';

const validationSchema = yup.object().shape({
  username: yup.string().required('Required'),
  first_name: yup.string().required('Required'),
  last_name: yup.string().required('Required'),
  // password: yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
});

const AdminUsers = () => {
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();
  const [globalFilter, setGlobalFilter] = useState('');

  const { listRef, data } = useInfiniteScroll<User>(
    useLazySearchUsersQuery as UseLazyQuery,
    { pageSize: 10, name: globalFilter },
    'users'
  );

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
      if (get(values, 'action') === FormikAction.CREATE) {
        createUser({
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
        }).unwrap().then(() => {
          dispatch(showSnackbar({
            id: 'create-user-success',
            message: 'User created successfully',
          }));
        }).catch(error => {
          dispatch(showSnackbar({
            id: 'create-user-error',
            message: error.data.message,
          }));
        });
      }
    }
  });

  const handleCreateUser = async ({ exitCreatingMode }: { exitCreatingMode: () => void; values: User }) => {
    try {
      showConfirm({
        title: 'Confirm Create User',
        message: 'Are you sure you want to create this user?',
        buttons: [
          {
            label: 'Create',
            onClick: () => {
              formik.setFieldValue('action', FormikAction.CREATE);
              formik.submitForm();
              exitCreatingMode();
            }
          },
          {
            label: 'Cancel',
          },
        ]
      });
    } catch (error) {
      console.error(error);
    }
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
          onChange: debounce(formik.handleChange, 500),
        },
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.first_name && formik.touched.first_name,
          helperText: formik.touched.first_name && formik.errors.first_name,
          onChange: debounce(formik.handleChange, 500),
        },
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.last_name && formik.touched.last_name,
          helperText: formik.touched.last_name && formik.errors.last_name,
          onChange: debounce(formik.handleChange, 500),
        },
      },
      // {
      //   accessorKey: 'password',
      //   header: 'Password',
      //   Cell: () => 'Hash Password',
      //   muiEditTextFieldProps: {
      //     required: true,
      //     type: 'password',
      //     error: !!formik.errors.password && formik.touched.password,
      //     helperText: formik.touched.password && formik.errors.password,
      //     onChange: debounce(formik.handleChange, 500),
      //   }
      // },
      {
        accessorKey: 'auth_date',
        header: 'Auth Date',
        enableEditing: false,
        Cell: ({ cell }) => moment.unix(cell.getValue<number>()).format('YYYY-MM-DD HH:mm:ss'),
      }
    ],
    [formik.errors, formik.touched],
  );

  const table = useMaterialReactTable({
    columns,
    data: data || [],
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: false,
    getRowId: row => row.id,
    enablePagination: false,
    enableStickyHeader: true,
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    muiTableContainerProps: {
      sx: {
        height: 'calc(100vh - 180px)',
      },
      ref: listRef,
    },
    onCreatingRowSave: handleCreateUser,
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
    state: { globalFilter }
  });

  return <MaterialReactTable table={table} />;
};

export default AdminUsers;
