import { Comment } from 'src/app/models/comment.model';
export type CommentItem = Pick<Comment, 'name' | 'body'>;
