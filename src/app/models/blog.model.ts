import { Comment } from 'src/app/models/comment.model';

export interface Blog {
  blogTitle: string;
  authorEmail: string;
  authorName: string;
  authorUsername: string;
  authorWebsite: string;
  blogBody: string;
  comments?: Comment[];
  blogId: number;
}
