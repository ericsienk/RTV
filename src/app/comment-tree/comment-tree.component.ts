import { ChannelService, Comment } from './../services/channel.service';
import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnChanges {
    @Input() postId: string;
    @Input() subRedditName: string;
    private comments$: Observable<Comment[]>;
    constructor(private channelService: ChannelService) { }

    ngOnChanges() {
        if (this.subRedditName && this.postId) {
            this.comments$ = this.channelService.getComments(this.subRedditName, this.postId);
      }
  }
}
