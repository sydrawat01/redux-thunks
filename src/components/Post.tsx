import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Post as TypedPost } from '../models/Post';

const Post: FC<{
  post?: TypedPost;
  excerpt: boolean;
}> = (props) => {
  return (
    <article className={props.excerpt ? 'post-excerpt' : 'post'}>
      <h2>{props.post?.title}</h2>
      <p>
        {props.excerpt ? props.post?.body!.substring(0, 100) : props.post?.body}
      </p>
      {props.excerpt && (
        <Link to={`/posts/${props.post?.id}`} className="button">
          View Post
        </Link>
      )}
    </article>
  );
};

export default Post;
