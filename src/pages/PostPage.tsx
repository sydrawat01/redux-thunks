import { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postSelector, fetchPost } from '../store/slices/post';
import { commentsSelector, fetchComments } from '../store/slices/comments';

import Post from '../components/Post';
import Comment from '../components/Comment';
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
    const urlId = match.params;
    const id: number = Object.values<number>(urlId)[0];

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

    return comments.map((comment) => (
      <Comment key={uuidv4()} comment={comment} />
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
