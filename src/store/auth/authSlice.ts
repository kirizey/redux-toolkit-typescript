import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
});

export default postsSlice.reducer;
