import { useMemo } from 'react';
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  MRT_Row,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';

const initialMissions: Mission[] = [
  { id: 'ms00001', name: 'First Login', description: 'Complete your first login to get started.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
  { id: 'ms00002', name: 'Profile Completion', description: 'Fill in your profile details completely.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
];

import * as yup from 'yup';
import { FormikAction } from '@/constants/enums';
import { Mission } from '@/api/missionApi';

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  status: yup.number().required('Required'),
  type: yup.number().required('Required'),
  point: yup.number().required('Required').positive('Must be a positive number'),
});

const AdminMissions = () => {

  const formik = useFormik<Mission>({
    initialValues: {
      id: '',
      name: '',
      description: '',
      status: 0,
      type: 0,
      point: 0,
      cooldown_period: 0,
      completed_at: '',
    },
    validationSchema,
    onSubmit: values => {
      console.warn('formik.onSubmit', values);
    }
  });

  const handleCreateMission = async ({ exitCreatingMode }: { exitCreatingMode: () => void; values: Mission }) => {
    try {
      // await createUser(values);
      formik.setFieldValue('action', FormikAction.CREATE);
      formik.submitForm();
      exitCreatingMode();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveMission = async ({ exitEditingMode }: { exitEditingMode: () => void; row: MRT_Row<Mission>; values: Mission }) => {
    try {
      // await updateUser(updatedMission);
      formik.setFieldValue('action', FormikAction.UPDATE);
      formik.submitForm();
      exitEditingMode();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMission = (row: MRT_Row<Mission>) => {
    // setDeleteConfirmModalOpen(false);
    console.warn('handleDeleteMission', row);
  };

  const columns = useMemo<MRT_ColumnDef<Mission>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.name && formik.touched.name,
          helperText: formik.touched.name && formik.errors.name,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.description && formik.touched.description,
          helperText: formik.touched.description && formik.errors.description,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }) => (cell.getValue<number>() === 1 ? 'Active' : 'Inactive'),
        muiEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key={0} value={0}>Inactive</MenuItem>,
            <MenuItem key={1} value={1}>Active</MenuItem>,
          ],
          required: true,
          error: !!formik.errors.status && formik.touched.status,
          helperText: formik.touched.status && formik.errors.status,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'type',
        header: 'Type',
        Cell: ({ cell }) => (cell.getValue<number>() === 1 ? 'One-time' : 'Daily'),
        muiEditTextFieldProps: {
          select: true,
          children: [
            <MenuItem key={0} value={0}>Daily</MenuItem>,
            <MenuItem key={1} value={1}>One-time</MenuItem>,
          ],
          required: true,
          error: !!formik.errors.type && formik.touched.type,
          helperText: formik.touched.type && formik.errors.type,
          onChange: formik.handleChange,
        },
      },
      {
        accessorKey: 'point',
        header: 'Point',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.point && formik.touched.point,
          helperText: formik.touched.point && formik.errors.point,
          onChange: formik.handleChange,
        },
      }
    ],
    [formik.errors, formik.touched],
  );

  const table = useMaterialReactTable({
    columns,
    data: initialMissions,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: row => row.id,
    // muiToolbarAlertBannerProps: isLoadingUsersError
    //   ? {
    //     color: 'error',
    //     children: 'Error loading data',
    //   }
    //   : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowSave: handleCreateMission,
    onEditingRowCancel: () => formik.resetForm(),
    onEditingRowSave: props => handleSaveMission(props),
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
          <IconButton color="error" onClick={() => handleDeleteMission(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
        sx={{
          mx: 2,
          my: 3
        }}
      >
        Create New Mission
      </Button>
    ),
    state: {
      // isLoading: isLoadingUsers,
      // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      // showAlertBanner: isLoadingUsersError,
      // showProgressBars: isFetchingUsers,
    },
  });

  return <Box sx={{
    '.MuiTableContainer-root': {
      minHeight: '75vh',
    }
  }}>
    <MaterialReactTable table={table} />
  </Box>;
};

export default AdminMissions;
