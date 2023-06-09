import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { Comment } from 'src/app/models/comment.model';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    component.commentData = {
      postId: 1,
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      body: 'This is a test comment.',
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct comment data', () => {
    const commentNameElement =
      fixture.nativeElement.querySelector('.comment__name');
    const commentBodyElement =
      fixture.nativeElement.querySelector('.comment__body');

    expect(commentNameElement.textContent).toContain(
      component.commentData.name
    );
    expect(commentBodyElement.textContent).toContain(
      component.commentData.body
    );
  });

  it('should display the correct avatar image URL', () => {
    const commentImageElement =
      fixture.nativeElement.querySelector('.comment__image');

    const expectedImageUrl = `https://ui-avatars.com/api/?name=John%20Doe&background=e1e1e1`;

    expect(commentImageElement.src).toContain(expectedImageUrl);
  });
});
