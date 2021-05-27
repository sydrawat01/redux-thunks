import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postSelector, fetchPost } from '../store/slices/post';
import { commentsSelector, fetchComments } from '../store/slices/comments';

import Post from '../components/Post';
import Comment from '../components/Comment';
import { Comment as TypedComment } from '../models/Comment';

import { match } from 'react-router';

const PostPage: FC<{ match: match }> = ({ match }) => {
  const dispatch = useAppDispatch();
  const {
    post,
    isLoading: postIsLoading,
    hasErrors: postHasErrors,
  } = useAppSelector(postSelector);
  const {
    comments,
    isLoading: commentIsLoading,
    hasErrors: commentHasErrors,
  } = useAppSelector(commentsSelector);

  useEffect(() => {
    const id: number = Object.values<number>(match.params)[0];

    dispatch(fetchComments(id));
    dispatch(fetchPost(id));
  }, [dispatch, match]);

  const renderPost = () => {
    if (postIsLoading) return <p>Post is loading ...</p>;
    if (postHasErrors) return <p>Unable to load post!</p>;

    return <Post post={post} excerpt={false} />;
  };

  const renderComments = () => {
    if (commentIsLoading) return <p>Comments are loading ...</p>;
    if (commentHasErrors) return <p>Unable to load comments!</p>;

    return comments?.map((comment: TypedComment) => (
      <Comment key={comment.id} comment={comment} />
    ));
  };

  return (
    <section>
      {renderPost()}
      <h2>Comments</h2>
      {renderComments()}
    </section>
  );
};

export default PostPage;
