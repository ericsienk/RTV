import { OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
export abstract class EmbedableComponent  implements OnInit {
    public url: string;
    public urlObject: URL;
    public source: SafeUrl;
    public isImage: boolean;
    public isIframe: boolean;

    constructor(protected sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.isImageUrl(this.url);
        this.urlObject = new URL(this.url);
        this.init();
    }

    protected abstract init();
    
    protected setSource(source: string, isIframe: boolean = false, query: string = '?autoplay=1&rel=0') {
        this.isIframe = isIframe;
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(source + query);
    }

    protected isImageUrl(url: string): boolean {
        this.isImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg)$)/g.test(url);
        return this.isImage;
    }
}
