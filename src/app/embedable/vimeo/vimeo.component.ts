import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { EmbedableComponent } from '../embedableComponent';

@Component({
  selector: 'rtv-vimeo-iframe',
  templateUrl: '../embedable-content.html',
})
export class VimeoComponent extends EmbedableComponent {

    constructor(sanitizer: DomSanitizer) {
        super(sanitizer);
    }

    init() {
    }
}
