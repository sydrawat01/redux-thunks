import { FC } from 'react';

interface TypedComment {
  title: string;
  email: string;
  body: string;
}
const Comment: FC<{ comment: TypedComment }> = (props) => {
  return (
    <aside className="comment">
      <h2>{props.comment.title}</h2>
      <h3>{props.comment.email}</h3>
      <p>{props.comment.body}</p>
    </aside>
  );
};

export default Comment;
