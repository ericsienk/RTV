import { WatchTvService } from './../watch-tv.service';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/services/channel.service';

@Component({
  selector: 'rtv-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
    public videos: Video[] = [];

    constructor(public tv: WatchTvService) { }

    ngOnInit() {
        this.tv.videoListUpdated.subscribe((videos => this.setVideos(videos)));
    }

    setVideos(videos: Video[]) {
        this.videos = videos;
    }
}
