import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoViewState {
  filter: 'all' | 'completed' | 'pending';
  searchQuery: string;
}

const initialState: TodoViewState = {
  filter: 'all',
  searchQuery: '',
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'completed' | 'pending'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setFilter, setSearchQuery } = todoSlice.actions;
export default todoSlice.reducer;
