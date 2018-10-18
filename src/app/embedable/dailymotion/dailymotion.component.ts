import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { EmbedableComponent } from '../embedableComponent';

@Component({
  selector: 'rtv-dailymotion',
  templateUrl: '../embedable-content.html',
})
export class DailymotionComponent extends EmbedableComponent implements OnInit {
    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }

    init() {
        this.setSource('https://www.dailymotion.com/embed/video/' + this.urlObject.pathname.split('/')[1], true);
    }

}
