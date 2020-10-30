import { PayloadAction, createSlice, Dispatch } from '@reduxjs/toolkit';
import { fetchAllPosts } from '../../core/api/posts/posts.api';
import { Post } from '../../core/models';

type StateType = {
  posts: Post[] | null;
  loading: boolean;
}

const initialState: StateType = {
  posts: null,
  loading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsList: (state: StateType, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { setPostsList } = postsSlice.actions;

/**
 * Fetch posts action.
 */
export function fetchPosts(): (dispatch: Dispatch) => Promise<void> {
  return async (dispatch: Dispatch): Promise<void> => {
    const posts = await fetchAllPosts();

    dispatch(setPostsList(posts));
  }
}

export default postsSlice.reducer;
