import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  posts: null,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {

  },
});

export default postsSlice.reducer;
