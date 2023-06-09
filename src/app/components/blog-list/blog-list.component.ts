import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { BlogService } from 'src/app/services/blog.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import User from 'src/app/models/user.models';
import { Comment } from 'src/app/models/comment.model';
import { Blog } from 'src/app/models/blog.model';
import { Post } from 'src/app/models/post.model';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  loading: boolean = false;
  blogItems: Blog[] = [];

  constructor(
    private blogService: BlogService,
    private localStorageService: LocalStorageService,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    const localStorageItems = this.localStorageService.getItem('blogs');
    if (localStorageItems) {
      this.blogItems = localStorageItems;
    } else {
      this.getAllBlogData();
    }
  }

  getAllBlogData(): void {
    this.loading = true;
    const posts$ = this.blogService.getPosts();
    const users$ = this.blogService.getUsers();
    const comments$ = this.blogService.getComments();

    forkJoin([posts$, users$, comments$])
      .pipe(
        map(([posts, users, comments]) =>
          this.mapBlogItems(posts, users, comments)
        )
      )
      .subscribe({
        next: (blogItems) => {
          this.blogItems = blogItems;
          this.localStorageService.setItem('blogs', this.blogItems);
        },
        error: (error) => {
          this.errorHandlingService.error('Error fetching blog data');
        },
        complete: () => (this.loading = false),
      });
  }

  mapBlogItems(posts: Post[], users: User[], comments: Comment[]): Blog[] {
    console.log(users);

    return posts.map((post) => {
      const user = users.find((u: User) => u.id === post.userId);
      const postComments = comments.filter(
        (c: Comment) => c.postId === post.id
      );

      return {
        blogTitle: post.title,
        authorEmail: user ? user.email : '',
        authorName: user ? user.name : '',
        authorUsername: user ? user.username : '',
        authorWebsite: user ? user.website : '',
        blogBody: post.body,
        comments: postComments ? postComments : [],
        blogId: post.id,
      };
    });
  }
}
