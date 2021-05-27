import { FC, useEffect } from 'react';

import { fetchPosts, selectedPosts } from '../store/slices/posts';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import Post from '../components/Post';
import { Post as TypedPost } from '../models/Post';

const PostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, hasErrors } = useAppSelector(selectedPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const renderPosts = () => {
    if (isLoading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Unable to display posts right now!</p>;
    return posts?.map((post: TypedPost) => (
      <Post key={post.id} post={post} excerpt={true} />
    ));
  };

  return (
    <section>
      <h1>Posts Page</h1>
      {renderPosts()}
    </section>
  );
};

export default PostsPage;
