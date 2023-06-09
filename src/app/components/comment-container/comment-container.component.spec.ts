import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentContainerComponent } from './comment-container.component';
import { CommentComponent } from '../comment/comment.component';
import { Comment } from 'src/app/models/comment.model';

describe('CommentContainerComponent', () => {
  let component: CommentContainerComponent;
  let fixture: ComponentFixture<CommentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentContainerComponent, CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display comments correctly', () => {
    const comments: Comment[] = [
      {
        postId: 1,
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        body: 'This is a test comment.',
      },
      {
        postId: 1,
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        body: 'Another test comment.',
      },
    ];

    component.comments = comments;
    fixture.detectChanges();

    const commentElements =
      fixture.nativeElement.querySelectorAll('app-comment');
    expect(commentElements.length).toBe(comments.length);
  });
});
