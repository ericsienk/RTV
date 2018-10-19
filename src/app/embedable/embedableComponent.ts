import { OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
export abstract class EmbedableComponent  implements OnInit {
    public url: string;
    public urlObject: URL;
    public source: SafeUrl;
    public isImage: boolean;
    public isIframe: boolean;
    public audio: SafeUrl;
    private htmlVideo: any;
    private htmlAudio: any;

    constructor(protected sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.isImageUrl(this.url);
        this.urlObject = new URL(this.url);
        this.init();
    }

    protected abstract init();
    
    protected setSource(source: string, isIframe: boolean = false, audioUrl: string = null, query: string = '?autoplay=1&rel=0') {
        this.isIframe = isIframe;
        this.source = this.sanitizer.bypassSecurityTrustResourceUrl(source + query);
        if (audioUrl) {
            this.audio = this.sanitizer.bypassSecurityTrustResourceUrl(audioUrl + query);
            setTimeout(() => {
                this.htmlVideo = document.getElementById('htmlVideo');
                this.htmlAudio = document.getElementById('htmlAudio');
                this.htmlVideo.addEventListener('seeked', () => {
                    this.htmlAudio.currentTime = this.htmlVideo.currentTime;
                });

                this.htmlVideo.addEventListener('pause', () => {
                    this.htmlAudio.currentTime = this.htmlVideo.currentTime;
                    this.htmlAudio.pause();
                });

                this.htmlVideo.addEventListener('play', () => {
                    this.htmlAudio.currentTime = this.htmlVideo.currentTime;
                    this.htmlAudio.play();
                });
            });
        }
    }

    protected isImageUrl(url: string): boolean {
        this.isImage = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg)$)/g.test(url);
        return this.isImage;
    }
}
