import { DomSanitizer } from '@angular/platform-browser';
import { EmbedableComponent } from '../embedableComponent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rtv-gfycat',
  templateUrl: '../embedable-content.html',
})
export class GfycatComponent extends EmbedableComponent implements OnInit {
    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }

    init() {
        this.setSource('https://gfycat.com/ifr/' + this.urlObject.pathname.split('/')[1], true);
    }
}
