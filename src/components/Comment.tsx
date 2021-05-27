import { FC } from 'react';

import { Comment as TypedComment } from '../models/Comment';

const Comment: FC<{ comment?: TypedComment }> = (props) => {
  return (
    <aside className="comment">
      <h2>{props.comment?.name}</h2>
      <h3>{props.comment?.email}</h3>
      <p>{props.comment?.body}</p>
    </aside>
  );
};

export default Comment;
