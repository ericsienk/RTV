import { Comment } from './../../services/channel.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
@Component({
  selector: 'app-comment',
    template: `
    <div *ngFor="let comment of comments">
    <ul>
     <li>
       <span class="level{{comment.level}}">{{comment.text}}</span>
       <app-comment [comments]="comment.replies" *ngIf="comment.replies.length"></app-comment>
     </li>
    </ul>
  </div>
    `,
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

    @Input() comments: Comment[];
  constructor() { }

    ngOnInit() {
  }

  ngOnChanges() {

  }
}
