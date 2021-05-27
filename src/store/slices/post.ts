import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { Post } from '../../models/Post';

type PostState = {
  post?: Post;
  hasErrors?: boolean;
  isLoading?: boolean;
};

const initialState: PostState = {
  post: {},
  hasErrors: false,
  isLoading: false,
};

const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    getPost(state: PostState) {
      state.isLoading = true;
    },
    getPostSuccess(state: PostState, action: PayloadAction<Post>) {
      state.post = action.payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getPostFailed(state: PostState) {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

export const { getPost, getPostSuccess, getPostFailed } = postSlice.actions;
export const postSelector = (state: RootState) => state.post;
export default postSlice.reducer;

export const fetchPost = (id: number) => async (dispatch: Dispatch) => {
  dispatch(getPost());

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = await response.json();
    dispatch(getPostSuccess(data));
  } catch (err) {
    dispatch(getPostFailed());
  }
};
