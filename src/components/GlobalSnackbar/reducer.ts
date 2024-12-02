import { SnackbarProps } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

export interface SnackbarState {
  id: string | number;
  message: SnackbarProps['message'];
  createdAt?: number;
}

const initialState: SnackbarState = {
  id: '',
  message: '',
  createdAt: 0,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, { payload }: {payload: SnackbarState}) => {
      const { id, message } = payload;
      state.id = id;
      state.message = message;
      state.createdAt = Date.now();
    },
    reset: state => {
      state.id = '';
      state.message = '';
      state.createdAt = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSnackbar, reset } = snackbarSlice.actions;

export default snackbarSlice.reducer;