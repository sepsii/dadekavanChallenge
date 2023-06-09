import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BlogService } from './blog.service';
import User from '../models/user.models';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService],
    });
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from the API', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Street',
          suite: 'Apt 4',
          city: 'City',
          zipcode: '12345',
          geo: { lat: '123', lng: '456' },
        },
        phone: '1234567890',
        website: 'johndoe.com',
        company: {
          name: 'ACME Inc',
          catchPhrase: 'Lorem ipsum',
          bs: 'Lorem ipsum',
        },
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        address: {
          street: '456 Avenue',
          suite: 'Apt 10',
          city: 'City',
          zipcode: '67890',
          geo: { lat: '789', lng: '012' },
        },
        phone: '9876543210',
        website: 'janesmith.com',
        company: {
          name: 'XYZ Corp',
          catchPhrase: 'Lorem ipsum',
          bs: 'Lorem ipsum',
        },
      },
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/users'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch posts from the API', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Post 1', body: 'Lorem ipsum' },
      { userId: 1, id: 2, title: 'Post 2', body: 'Dolor sit amet' },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should fetch comments from the API', () => {
    const mockComments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'Comment 1',
        email: 'comment1@example.com',
        body: 'Lorem ipsum',
      },
      {
        postId: 1,
        id: 2,
        name: 'Comment 2',
        email: 'comment2@example.com',
        body: 'Dolor sit amet',
      },
    ];

    service.getComments().subscribe((comments) => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/comments'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });
});
