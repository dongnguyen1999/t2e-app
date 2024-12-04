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

// const initialMissions: Mission[] = [
//   { id: 'ms00001', name: 'First Login', description: 'Complete your first login to get started.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00002', name: 'Profile Completion', description: 'Fill in your profile details completely.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00003', name: 'Daily Login', description: 'Log in daily to earn points.', status: 1, type: 0, point: 0.01, cooldown_period: 24, completed_at: '' },
//   { id: 'ms00004', name: 'Invite a Friend', description: 'Invite a friend to join the platform.', status: 1, type: 1, point: 0.05, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00005', name: 'First Purchase', description: 'Make your first purchase.', status: 1, type: 1, point: 0.1, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00006', name: 'Weekly Activity', description: 'Be active for a week.', status: 1, type: 0, point: 0.02, cooldown_period: 168, completed_at: '' },
//   { id: 'ms00007', name: 'Monthly Activity', description: 'Be active for a month.', status: 1, type: 0, point: 0.05, cooldown_period: 720, completed_at: '' },
//   { id: 'ms00008', name: 'Profile Picture', description: 'Upload a profile picture.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00009', name: 'Update Profile', description: 'Update your profile information.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00010', name: 'Join a Group', description: 'Join a group of your interest.', status: 1, type: 1, point: 0.02, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00011', name: 'Post a Comment', description: 'Post a comment on a discussion.', status: 1, type: 0, point: 0.005, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00012', name: 'Like a Post', description: 'Like a post.', status: 1, type: 0, point: 0.005, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00013', name: 'Share a Post', description: 'Share a post.', status: 1, type: 0, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00014', name: 'Complete a Survey', description: 'Complete a survey.', status: 1, type: 1, point: 0.05, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00015', name: 'Attend an Event', description: 'Attend an event.', status: 1, type: 1, point: 0.1, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00016', name: 'Daily Quiz', description: 'Complete the daily quiz.', status: 1, type: 0, point: 0.01, cooldown_period: 24, completed_at: '' },
//   { id: 'ms00017', name: 'Weekly Quiz', description: 'Complete the weekly quiz.', status: 1, type: 0, point: 0.02, cooldown_period: 168, completed_at: '' },
//   { id: 'ms00018', name: 'Monthly Quiz', description: 'Complete the monthly quiz.', status: 1, type: 0, point: 0.05, cooldown_period: 720, completed_at: '' },
//   { id: 'ms00019', name: 'First Post', description: 'Create your first post.', status: 1, type: 1, point: 0.01, cooldown_period: 0, completed_at: '' },
//   { id: 'ms00020', name: 'Daily Challenge', description: 'Complete the daily challenge.', status: 1, type: 0, point: 0.02, cooldown_period: 24, completed_at: '' },
//   { id: 'ms00021', name: 'Weekly Challenge', description: 'Complete the weekly challenge.', status: 1, type: 0, point: 0.05, cooldown_period: 168, completed_at: '' },
//   { id: 'ms00022', name: 'Monthly Challenge', description: 'Complete the monthly challenge.', status: 1, type: 0, point: 0.1, cooldown_period: 720, completed_at: '' },
// ];

import * as yup from 'yup';
import { FormikAction } from '@/constants/enums';
import { Mission, useCreateMissionMutation, useDeleteMissionMutation, useLazyGetMissionsQuery, useUpdateMissionMutation } from '@/api/missionApi';
import useInfiniteScroll, { UseLazyQuery } from '@/hooks/useInfiniteScroll';
import { debounce, get } from 'lodash';
import showConfirm from '@/components/ConfirmAlert';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/components/GlobalSnackbar/reducer';

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  status: yup.number().required('Required'),
  type: yup.number().required('Required'),
  point: yup.number().required('Required').positive('Must be a positive number'),
});

const AdminMissions = () => {
  const dispatch = useDispatch();
  const [createMission] = useCreateMissionMutation();
  const [updateMission] = useUpdateMissionMutation();
  const [deleteMission] = useDeleteMissionMutation();


  const { listRef, data } = useInfiniteScroll<Mission>(
    useLazyGetMissionsQuery as UseLazyQuery,
    { pageSize: 10, type: 1 },
    'missions'
  );

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
      if (get(values, 'action') === FormikAction.CREATE) {
        createMission({
          name: values.name,
          description: values.description,
          status: values.status,
          type: values.type,
          point: values.point,
        }).unwrap().then(() => {
          dispatch(showSnackbar({
            id: 'create-mission-success',
            message: 'Mission created successfully',
          }));
        }).catch(error => {
          dispatch(showSnackbar({
            id: 'create-mission-error',
            message: error.data.message,
          }));
        });
      } else if (get(values, 'action') === FormikAction.UPDATE) {
        updateMission({
          id: values.id,
          name: values.name,
          description: values.description,
          status: values.status,
          type: values.type,
          point: values.point,
        }).unwrap().then(() => {
          dispatch(showSnackbar({
            id: 'update-mission-success',
            message: 'Mission updated successfully',
          }));
        }).catch(error => {
          dispatch(showSnackbar({
            id: 'update-mission-error',
            message: error.data.message,
          }));
        });
      }
    }
  });

  const handleCreateMission = async ({ exitCreatingMode }: { exitCreatingMode: () => void; values: Mission }) => {
    try {
      showConfirm({
        title: 'Confirm Create Mission',
        message: 'Are you sure you want to create this mission?',
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

  const handleSaveMission = async ({ exitEditingMode }: { exitEditingMode: () => void; row: MRT_Row<Mission>; values: Mission }) => {
    try {
      showConfirm({
        title: 'Confirm Update Mission',
        message: 'Are you sure you want to update this mission?',
        buttons: [
          {
            label: 'Update',
            onClick: () => {
              formik.setFieldValue('action', FormikAction.UPDATE);
              formik.submitForm();
              exitEditingMode();
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

  const handleDeleteMission = (row: MRT_Row<Mission>) => {
    try {
      showConfirm({
        title: 'Confirm Delete Mission',
        message: 'Are you sure you want to delete this mission?',
        buttons: [
          {
            label: 'Delete',
            color: 'error',
            onClick: () => {
              deleteMission(row.original.id).unwrap().then(() => {
                dispatch(showSnackbar({
                  id: 'delete-user-success',
                  message: 'User deleted successfully',
                }));
              }).catch(error => {
                dispatch(showSnackbar({
                  id: 'delete-user-error',
                  message: error.data.message,
                }));
              });
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
          onChange: debounce(formik.handleChange, 500),
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.description && formik.touched.description,
          helperText: formik.touched.description && formik.errors.description,
          onChange: debounce(formik.handleChange, 500),
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
          onChange: debounce(formik.handleChange, 500),
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
          onChange: debounce(formik.handleChange, 500),
        },
      },
      {
        accessorKey: 'point',
        header: 'Point',
        muiEditTextFieldProps: {
          required: true,
          error: !!formik.errors.point && formik.touched.point,
          helperText: formik.touched.point && formik.errors.point,
          onChange: debounce(formik.handleChange, 500),
        },
      }
    ],
    [formik.errors, formik.touched],
  );

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'row', // ('modal', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: row => row.id,
    enablePagination: false,
    enableStickyHeader: true,
    muiTableContainerProps: {
      sx: {
        height: 'calc(100vh - 180px)',
      },
      ref: listRef,
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
