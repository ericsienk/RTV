import { Observable, of } from 'rxjs';
import {Video, ChannelService } from './../services/channel.service';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
      
export class WatchTvService {
    private videos: Video[];
    public currentIndex: number; /*make api for knowing selected video */
    private initialized: boolean;
    private selectedSubredditName = 'videos';
    public currentVideoUpdated: EventEmitter<Video> = new EventEmitter();
    public videoListUpdated: EventEmitter<Video[]> = new EventEmitter();
    public readonly suggestedSubredditNameList = [
        'videos',
        'aww',
        'oddlysatisfying',
        'woahtube',
        'blackmagicfuckery',
    ];

    constructor(private channelService: ChannelService) {
        this.videos = [];
        this.currentIndex = -1;
    }

    public initialize(lastVideo: Video = null, subreddit: string = this.selectedSubredditName): Observable<boolean> {
        this.selectedSubredditName = subreddit;
        return this.channelService.getVideos(subreddit, 100, lastVideo).pipe(map(videos => {
            this.videos = this.videos.concat(videos || []);
            this.videoListUpdated.emit(this.videos);
            this.initialized = true;
            return this.initialized;
        }));
    }

    public hasNext(): boolean {
        return this.initialized && this.videos.length > this.currentIndex + 1;
    }

    public hasPrevious(): boolean {
        return this.initialized && this.currentIndex > 0 && this.videos.length > 0;
    }

    /* TODO use video id instead of index */
    public setCurrentVideo(index) {
        this.getVideo(index);
    }

    private getVideo(index): Video {
        if (this.currentIndex !== index) {
            this.currentVideoUpdated.emit(this.videos[index]);
        }

        this.currentIndex = index;
        return this.videos[this.currentIndex];
    }

    private getCurrentVideo(): Video {
        if (this.initialize && this.currentIndex < this.videos.length) {
            return this.videos[this.currentIndex];
        } else {
            return null;
        }
    }

    public next(): Observable<Video> {
        if (this.hasNext()) {
            return of(this.getVideo(this.currentIndex + 1));
        } else {
            return this.initialize(this.getCurrentVideo()).pipe(map(() => {
                return this.getVideo(this.currentIndex + 1);
            }));
        }
    }

    public previous(): Observable<Video> {
        if (this.hasPrevious()) {
            return of(this.getVideo(this.currentIndex - 1));
        } else if (this.videos.length > 0) {
            return of(this.getVideo(0));
        }
    }

    public getSubredditName(): string {
        return this.selectedSubredditName;
    }

    public setSubredditName(subredditName: string): Observable<Video> {
        if (this.selectedSubredditName.toLowerCase() !== subredditName.toLowerCase()) {
            this.selectedSubredditName = subredditName;
            this.videos = [];
            this.currentIndex = -1;
            return this.next();
        } else {
            return of();
        }
    }
}
