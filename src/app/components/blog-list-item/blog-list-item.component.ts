import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss'],
})
export class BlogListItemComponent {
  @Input() blogListItemData!: Blog;
  constructor(private router: Router) {}

  navigateToNewComponent(data: Blog): void {
    this.router.navigate([`/blog/${data.blogId}`]);
  }
}
