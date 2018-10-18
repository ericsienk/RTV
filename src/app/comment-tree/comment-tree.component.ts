import { ChannelService, Comment } from './../services/channel.service';
import { Component, Input, OnChanges, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'rtv-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnChanges {
    @Input() postId: string;
    @Input() subredditName: string;
    comments$: Observable<Comment[]>;
    constructor(private channelService: ChannelService, @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: any = null) {
        if (data) {
            this.postId = data.postId;
            this.subredditName = data.subredditName;
            this.initalize();
        }
     }

    ngOnChanges() {
        this.initalize();
    }

    initalize() {
        if (this.postId && this.subredditName) {
            this.comments$ = this.channelService.getComments(this.postId, this.subredditName);
        }
    }
}
