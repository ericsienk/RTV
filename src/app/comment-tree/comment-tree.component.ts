import { ChannelService, Comment } from './../services/channel.service';
import { Component, Input, OnChanges, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-comment-tree',
  templateUrl: './comment-tree.component.html',
  styleUrls: ['./comment-tree.component.css']
})
export class CommentTreeComponent implements OnChanges {
    @Input() postId: string;
    @Input() subRedditName: string;
    comments$: Observable<Comment[]>;
    constructor(private channelService: ChannelService, @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public data: any = null) {
        if (data) {
            this.postId = data.postId;
            this.subRedditName = data.subRedditName;
            this.initalize();
        }
     }

    ngOnChanges() {
        this.initalize();
    }

    initalize() {
        if (this.subRedditName && this.postId) {
            this.comments$ = this.channelService.getComments(this.subRedditName, this.postId);
        }
    }
}
