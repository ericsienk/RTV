import { DomSanitizer } from '@angular/platform-browser';
import { EmbedableComponent } from '../embedableComponent';
import { Component } from '@angular/core';

@Component({
  selector: 'rtv-youtube',
  templateUrl: '../embedable-content.html',
})
export class YoutubeComponent extends EmbedableComponent {
    constructor(sanitzer: DomSanitizer) {
        super(sanitzer);
    }

    init() {
        if (this.urlObject.href.indexOf('youtube.com') > -1) {
            this.setSource(this.getYoutubeSource(this.urlObject), true);
        } else {
            this.setSource(this.getMobileYoutubeSource(this.urlObject), true);
        }
    }
    
    getYoutubeSource(url: URL) {
        const matches = url.search.match(/v=([\w-]+)/) || url.search.match(/v%3D(\w+)/);
        return 'https://www.youtube.com/embed/' + matches[1];
    }

    getMobileYoutubeSource(url: URL) {
        return 'https://www.youtube.com/embed/' + url.pathname.split('/')[1];
    }
}
