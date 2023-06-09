import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../models/user.models';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Blog } from '../models/blog.model';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users');
  }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + '/posts');
  }
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + '/comments');
  }
}
