import { EmbedableComponent } from '../embedableComponent';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'rtv-reddit',
  templateUrl: '../embedable-content.html',
})
export class RedditComponent extends EmbedableComponent implements OnInit {
    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }

    init() {
        if (this.isImage) {
            this.setSource(this.url);
        } else {
            this.setSource(this.url + '/DASH_600_K');
        }
    }
}
