import { Injectable } from '@angular/core';
import { EmbedableComponent } from '../embedable/embedableComponent';
import { YoutubeComponent } from '../embedable/youtube/youtube.component';
import { DailymotionComponent } from '../embedable/dailymotion/dailymotion.component';
import { VimeoComponent } from '../embedable/vimeo/vimeo.component';
import { GfycatComponent } from '../embedable/gfycat/gfycat.component';
import { RedditComponent } from '../embedable/reddit/reddit.component';
import { ImgurComponent } from '../embedable/imgur/imgur.component';

@Injectable({
  providedIn: 'root'
})
      
export class EmbedService {
    constructor() { }
    private contentMap = {
        map: {
            'youtube.com': {
                component: YoutubeComponent,
            },
            'youtu.be': {
                component: YoutubeComponent,
            },
            'm.youtube.com': {
                component: YoutubeComponent
            },
            'vimeo.com': {
                component: VimeoComponent,
            },
            'dailymotion.com': {
                component: DailymotionComponent,
            },
            'dai.ly': {
                component: DailymotionComponent,
            },
            'gfycat.com': {
                component: GfycatComponent,
            },
            'v.redd.it': {
                component: RedditComponent,
            },
            'i.redd.it': {
                component: RedditComponent,
            },
            'i.imgur.com': {
                component: ImgurComponent,
            }
        }
    };

    public getEmbedableComponent(url: URL): EmbedableComponent {
        const mapped = this.contentMap.map[url.hostname.replace('www.', '')];
        if (mapped) {
            return mapped.component;
        }
    }
}
