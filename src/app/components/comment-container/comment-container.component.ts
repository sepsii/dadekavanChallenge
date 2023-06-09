import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrls: ['./comment-container.component.scss'],
})
export class CommentContainerComponent {
  @Input() comments?: Comment[] = [];
}
