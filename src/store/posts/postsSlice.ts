import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  posts: null,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsList: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const fetchPosts = () => (dispatch) => {};

export default postsSlice.reducer;
