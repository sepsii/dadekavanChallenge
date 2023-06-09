
import { Post } from "./post.model";
import User from "./user.models";
export type BlogListItem = Pick<Post, 'title'> & Pick<User, 'email'>;