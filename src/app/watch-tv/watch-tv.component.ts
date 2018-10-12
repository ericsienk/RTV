import { Video } from './../services/channel.service';
import { WatchTvService } from './watch-tv.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watch-tv',
  templateUrl: './watch-tv.component.html',
  styleUrls: ['./watch-tv.component.css']
})
export class WatchTvComponent implements OnInit {

    private video: Video;
    private videoId: string;
    
    constructor(private tv: WatchTvService) { }

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
}
