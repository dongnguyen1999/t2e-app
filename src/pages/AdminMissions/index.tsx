import React, { useState } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

interface Mission {
  id: string;
  name: string;
  description: string;
  status: number;
  type: number;
  point: number;
}

const initialMissions: Mission[] = [
  { id: 'ms00001', name: 'First Login', description: 'Complete your first login to get started.', status: 1, type: 1, point: 0.01 },
  { id: 'ms00002', name: 'Profile Completion', description: 'Fill in your profile details completely.', status: 1, type: 1, point: 0.01 },
];

const AdminMissions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [editId, setEditId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Mission>>({});

  const handleEdit = (mission: Mission) => {
    setEditId(mission.id);
    setEditValues(mission);
  };

  const handleSave = () => {
    setMissions(missions.map(mission => (mission.id === editId ? { ...mission, ...editValues } : mission)));
    setEditId(null);
    setEditValues({});
  };

  const handleCancel = () => {
    setEditId(null);
    setEditValues({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const columns: MRT_ColumnDef<Mission>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
      Cell: ({ cell, row }) => (
        editId === row.original.id ? (
          <TextField
            name="name"
            value={editValues.name || ''}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          cell.getValue<string>()
        )
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      Cell: ({ cell, row }) => (
        editId === row.original.id ? (
          <TextField
            name="description"
            value={editValues.description || ''}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          cell.getValue<string>()
        )
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      Cell: ({ cell, row }) => (
        editId === row.original.id ? (
          <TextField
            name="status"
            value={editValues.status || ''}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          cell.getValue<number>()
        )
      ),
    },
    {
      accessorKey: 'type',
      header: 'Type',
      Cell: ({ cell, row }) => (
        editId === row.original.id ? (
          <TextField
            name="type"
            value={editValues.type || ''}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          cell.getValue<number>()
        )
      ),
    },
    {
      accessorKey: 'point',
      header: 'Point',
      Cell: ({ cell, row }) => (
        editId === row.original.id ? (
          <TextField
            name="point"
            value={editValues.point || ''}
            onChange={handleChange}
            fullWidth
          />
        ) : (
          cell.getValue<number>()
        )
      ),
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        editId === row.original.id ? (
          <>
            <IconButton onClick={handleSave}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => handleEdit(row.original)}>
            <EditIcon />
          </IconButton>
        )
      ),
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <MaterialReactTable
        columns={columns}
        data={missions}
        enableEditing
      />
    </Box>
  );
};

export default AdminMissions;