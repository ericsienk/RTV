import { DomSanitizer } from '@angular/platform-browser';
import { EmbedableComponent } from '../embedableComponent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rtv-imgur',
  templateUrl: '../embedable-content.html',
})
export class ImgurComponent extends EmbedableComponent implements OnInit {
    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }

    init() {
        if (this.isImage) {
            this.setSource(this.urlObject.href);
        } else {
            this.setSource(this.urlObject.href.replace('gifv', 'mp4'));
        }
    }
}
