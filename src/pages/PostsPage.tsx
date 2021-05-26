import { FC, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { fetchPosts, selectedPosts } from '../store/slices/posts';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import Post from '../components/Post';

const PostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, hasErrors } = useAppSelector(selectedPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  const renderPosts = () => {
    if (isLoading) return <p>Loading ...</p>;
    if (hasErrors) return <p>Unable to display posts right now!</p>;
    return posts.map((post) => (
      <Post key={uuidv4()} post={post} excerpt={true} />
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
