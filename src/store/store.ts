import { configureStore } from '@reduxjs/toolkit';

import PostsReducer from './slices/posts';
import PostReducer from './slices/post';
import CommentsReducer from './slices/comments';

export const store = configureStore({
  reducer: {
    posts: PostsReducer,
    post: PostReducer,
    comments: CommentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
