import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogComponent } from './blog.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { of } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { CommentContainerComponent } from '../comment-container/comment-container.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let mockActivatedRoute: any;
  let mockLocalStorageService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => '1', // Set the id parameter to '1' for testing
      }),
    };

    mockLocalStorageService = {
      getItem: jasmine.createSpy('getItem').and.returnValue([
        {
          blogId: 1,
          blogTitle: 'Test Blog',
          authorName: 'John Doe',
          authorEmail: 'email',
          authorWebsite: 'website',
          authorUsername: 'username',
          blogBody: 'Lorem ipsum dolor sit amet',
          comments: [],
        },
      ]),
    };

    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [BlogComponent, CommentContainerComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize blogData with the correct blog item', () => {
    const expectedBlogData: Blog = {
      blogId: 1,
      blogTitle: 'Test Blog',
      authorName: 'John Doe',
      authorEmail: 'email',
      authorWebsite: 'website',
      authorUsername: 'username',
      blogBody: 'Lorem ipsum dolor sit amet',
      comments: [],
    };

    expect(component.blogData).toEqual(expectedBlogData);
  });

  it('should navigate to home page if blog data is not found', () => {
    mockLocalStorageService.getItem.and.returnValue([]);

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
