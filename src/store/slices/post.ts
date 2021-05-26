import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TypedPost = {
  post: {
    userId?: number;
    id?: number;
    title?: string;
    body?: string;
  };
  hasErrors: boolean;
  isLoading: boolean;
};

const initialState: TypedPost = {
  post: {},
  hasErrors: false,
  isLoading: false,
};

const postSlice = createSlice({
  name: 'Post',
  initialState,
  reducers: {
    getPost(state: TypedPost) {
      state.isLoading = true;
    },
    getPostSuccess(state: TypedPost, action: PayloadAction<{}>) {
      state.post = action.payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getPostFailed(state: TypedPost) {
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
