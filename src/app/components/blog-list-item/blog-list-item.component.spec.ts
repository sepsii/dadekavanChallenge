import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogListItemComponent } from './blog-list-item.component';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/blog.model';
import { TextLimitPipe } from './../../pipes/text-limit.pipe';

describe('BlogListItemComponent', () => {
  let component: BlogListItemComponent;
  let fixture: ComponentFixture<BlogListItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogListItemComponent, TextLimitPipe],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.blogListItemData = {
      blogId: 1,
      blogTitle: 'Test Blog',
      authorEmail: 'test@example.com',
      authorUsername: 'test@example.com',
      authorWebsite: 'test@example.com',
      authorName: 'Test User',
      blogBody: 'This is a test blog.',
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct blog when clicked', () => {
    spyOn(router, 'navigate');
    component.navigateToNewComponent(component.blogListItemData);
    expect(router.navigate).toHaveBeenCalledWith(['/blog/1']);
  });
});
