import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TypedComments {
  comments: [];
  isLoading: boolean;
  hasErrors: boolean;
}

const initialState: TypedComments = {
  comments: [],
  isLoading: false,
  hasErrors: false,
};

const commentsSlice = createSlice({
  name: 'Comments',
  initialState,
  reducers: {
    getComments(state: TypedComments) {
      state.isLoading = true;
    },
    getCommentsSuccess(state: TypedComments, action: PayloadAction<[]>) {
      state.comments = action.payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getCommentsFailed(state: TypedComments) {
      state.isLoading = false;
      state.hasErrors = false;
    },
  },
});

export const { getComments, getCommentsSuccess, getCommentsFailed } =
  commentsSlice.actions;
export const commentsSelector = (state: RootState) => state.comments;
export default commentsSlice.reducer;

export const fetchComments = (postId: number) => async (dispatch: Dispatch) => {
  dispatch(getComments());

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const data = await response.json();

    dispatch(getCommentsSuccess(data));
  } catch (err) {
    dispatch(getCommentsFailed());
  }
};
