import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogService } from 'src/app/services/blog.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { of } from 'rxjs';
import { Blog } from 'src/app/models/blog.model';
import { Post } from 'src/app/models/post.model';
import User from 'src/app/models/user.models';
import { Comment } from 'src/app/models/comment.model';
import { LoadingComponent } from '../loading/loading.component';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;
  let mockBlogService: any;
  let mockLocalStorageService: any;
  let mockErrorHandlingService: any;

  beforeEach(async () => {
    mockBlogService = jasmine.createSpyObj('BlogService', [
      'getPosts',
      'getUsers',
      'getComments',
    ]);
    mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem',
      'setItem',
    ]);
    mockErrorHandlingService = jasmine.createSpyObj('ErrorHandlingService', [
      'error',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BlogListComponent, LoadingComponent],
      providers: [
        { provide: BlogService, useValue: mockBlogService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: ErrorHandlingService, useValue: mockErrorHandlingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load blogItems from localStorage if available', () => {
    const mockBlogItems: Blog[] = [
      {
        blogTitle: 'Test Blog 1',
        authorEmail: 'test1@example.com',
        authorName: 'Test User 1',
        authorUsername: 'Author Username 1',
        authorWebsite: 'test website 1',
        blogBody: 'Lorem ipsum dolor sit amet',
        comments: [],
        blogId: 1,
      },
      {
        blogTitle: 'Test Blog 2',
        authorEmail: 'test2@example.com',
        authorName: 'Test User 2',
        authorUsername: 'Author Username 2',
        authorWebsite: 'test website 2',
        blogBody: 'Lorem ipsum dolor sit amet',
        comments: [],
        blogId: 2,
      },
    ];
    mockLocalStorageService.getItem.and.returnValue(mockBlogItems);

    component.ngOnInit();

    expect(component.blogItems).toEqual(mockBlogItems);
  });

  it('should call getAllBlogData if blogItems are not available in localStorage', () => {
    mockLocalStorageService.getItem.and.returnValue(null);

    component.ngOnInit();

    expect(mockBlogService.getPosts).toHaveBeenCalled();
    expect(mockBlogService.getUsers).toHaveBeenCalled();
    expect(mockBlogService.getComments).toHaveBeenCalled();
  });

  it('should map blogItems correctly', () => {
    const mockPosts: Post[] = [
      {
        id: 1,
        userId: 1,
        title: 'Test Blog 1',
        body: 'Lorem ipsum dolor sit amet',
      },
      {
        id: 2,
        userId: 2,
        title: 'Test Blog 2',
        body: 'Lorem ipsum dolor sit amet',
      },
    ];
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Test User 1',
        username: 'testuser1',
        email: 'test1@example.com',
        address: {
          street: '123 Street',
          suite: 'Apt 4',
          city: 'City 1',
          zipcode: '12345',
          geo: {
            lat: '12.3456',
            lng: '78.9012',
          },
        },
        phone: '123-456-7890',
        website: 'www.testuser1.com',
        company: {
          name: 'Test Company 1',
          catchPhrase: 'Catch phrase 1',
          bs: 'BS 1',
        },
      },
      {
        id: 2,
        name: 'Test User 2',
        username: 'testuser2',
        email: 'test2@example.com',
        address: {
          street: '456 Street',
          suite: 'Apt 8',
          city: 'City 2',
          zipcode: '54321',
          geo: {
            lat: '98.7654',
            lng: '21.4321',
          },
        },
        phone: '987-654-3210',
        website: 'www.testuser2.com',
        company: {
          name: 'Test Company 2',
          catchPhrase: 'Catch phrase 2',
          bs: 'BS 2',
        },
      },
    ];

    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Comment 1',
        body: 'Lorem ipsum dolor sit amet',
        email: 'randomeemail',
      },
      {
        postId: 2,
        id: 2,
        name: 'Comment 2',
        body: 'Lorem ipsum dolor sit amet',
        email: 'randomeemail',
      },
    ];

    mockBlogService.getPosts.and.returnValue(of(mockPosts));
    mockBlogService.getUsers.and.returnValue(of(mockUsers));
    mockBlogService.getComments.and.returnValue(of(mockComments));

    component.getAllBlogData();

    expect(component.blogItems).toEqual([
      {
        blogTitle: 'Test Blog 1',
        authorEmail: 'test1@example.com',
        authorName: 'Test User 1',
        authorUsername: 'Author Username 1',
        authorWebsite: 'test website 1',
        blogBody: 'Lorem ipsum dolor sit amet',
        comments: [
          {
            postId: 1,
            id: 1,
            name: 'Comment 1',
            body: 'Lorem ipsum dolor sit amet',
            email: 'randomeemail',
          },
        ],
        blogId: 1,
      },
      {
        blogTitle: 'Test Blog 2',
        authorEmail: 'test2@example.com',
        authorName: 'Test User 2',
        authorUsername: 'Author Username 2',
        authorWebsite: 'test website 2',
        blogBody: 'Lorem ipsum dolor sit amet',
        comments: [
          {
            postId: 2,
            id: 2,
            name: 'Comment 2',
            body: 'Lorem ipsum dolor sit amet',
            email: 'randomeemail',
          },
        ],
        blogId: 2,
      },
    ]);

    expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(
      'blogs',
      component.blogItems
    );
  });

  it('should handle error when getting blog data', () => {
    const mockError = 'Error fetching blog data';
    mockBlogService.getPosts.and.returnValue(of([]));
    mockBlogService.getUsers.and.returnValue(of([]));
    mockBlogService.getComments.and.returnValue(of([]));

    component.getAllBlogData();

    expect(mockErrorHandlingService.error).toHaveBeenCalledWith(mockError);
  });
});
