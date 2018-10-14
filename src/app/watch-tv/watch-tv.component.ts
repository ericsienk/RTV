import { CommentTreeComponent } from './../comment-tree/comment-tree.component';
import { Video } from './../services/channel.service';
import { WatchTvService } from './watch-tv.service';
import { Component, OnInit, HostListener } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-watch-tv',
  templateUrl: './watch-tv.component.html',
  styleUrls: ['./watch-tv.component.css']
})
export class WatchTvComponent implements OnInit {
    
    constructor(private tv: WatchTvService, private bottomSheet: MatBottomSheet, private breakpointObserver: BreakpointObserver) { }

    video: Video;
    videoId: string;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => result.matches)
    );

    private setVideo(video: Video) {
        this.video = video;
        this.videoId = video.id;
    }

    public previous() {
        this.tv.previous().subscribe(video => this.setVideo(video));
    }

    public next() {
        this.tv.next().subscribe(video => this.setVideo(video));
    }

    ngOnInit() {
        this.next();
    }

    openBottomSheet(): void {
        this.bottomSheet.open(CommentTreeComponent, {
            data: {
                postId: this.videoId,
                subRedditName: 'videos'
            }
        });
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.keyCode === 39) {
            this.next();
        }

        if (event.keyCode === 37) {
            this.previous();
        }
  }
}
