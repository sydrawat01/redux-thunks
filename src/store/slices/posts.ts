import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TypedState {
  posts: [];
  isLoading: boolean;
  hasErrors: boolean;
}
const initialState: TypedState = {
  posts: [],
  isLoading: false,
  hasErrors: false,
};
const postsSlice = createSlice({
  name: 'Posts',
  initialState,
  reducers: {
    getPosts(state: TypedState) {
      state.isLoading = true;
    },
    getPostsSuccess(state: TypedState, action: PayloadAction<[]>) {
      state.posts = action.payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getPostsFailed(state: TypedState) {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const { getPosts, getPostsSuccess, getPostsFailed } = postsSlice.actions;
export default postsSlice.reducer;

export const selectedPosts = (state: RootState) => state.posts;

export const fetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(getPosts());

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    dispatch(getPostsSuccess(data));
  } catch (error) {
    dispatch(getPostsFailed());
  }
};
