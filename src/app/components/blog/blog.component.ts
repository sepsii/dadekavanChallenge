import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { Blog } from 'src/app/models/blog.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  blogData!: Blog;
  loading: boolean = false;
  id!: number;
  authorData!: Author;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = +params.get('id')!;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    const blogItems = this.localStorageService.getItem('blogs');
    const blogData = blogItems.find((blog: Blog) => blog.blogId === this.id);

    if (blogData) {
      this.blogData = blogData;
      this.authorData = this.extractAuthorData(blogData);

      this.loading = false;
    } else {
      this.loading = false;
      this.router.navigate(['/']);
    }
  }
  extractAuthorData(blog: Blog) {
    const { authorEmail, authorName, authorUsername, authorWebsite } = blog;
    return { authorEmail, authorName, authorUsername, authorWebsite };
  }
}
