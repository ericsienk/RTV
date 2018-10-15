import { Injectable } from '@angular/core';

export interface FsDocument extends HTMLDocument {
    fullscreenElement: Element;
    webkitFullscreenElement: any;
    webkitExitFullscreen: any;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    msExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
}
  
export interface FsDocumentElement extends HTMLElement {
    webkitRequestFullscreen: any;
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
}
  
  
@Injectable({
    providedIn: 'root'
})
  
export class FullscreenService {
    setFullScreen(full: boolean): void {
        if (full !== this.isFullScreen()) {
            this.toggleFullScreen();
        }
    }

    isFullScreen(): boolean {
        const fsDoc = <FsDocument>document;
      
        return !!(fsDoc.fullscreenElement || fsDoc.mozFullScreenElement || fsDoc.webkitFullscreenElement || fsDoc.msFullscreenElement);
    }
      
    toggleFullScreen(): void {
        const fsDoc = <FsDocument>document;
      
        if (!this.isFullScreen()) {
            const fsDocElem = <FsDocumentElement>document.documentElement;
      
            if (fsDocElem.requestFullscreen) {
                fsDocElem.requestFullscreen();
            } else if (fsDocElem.msRequestFullscreen) {
                fsDocElem.msRequestFullscreen();
            } else if (fsDocElem.mozRequestFullScreen) {
                fsDocElem.mozRequestFullScreen();
            } else if (fsDocElem.webkitRequestFullscreen) {
                fsDocElem.webkitRequestFullscreen();
            }
        } else {
            if (fsDoc.exitFullscreen) {
                fsDoc.exitFullscreen();
            } else if (fsDoc.msExitFullscreen) {
                fsDoc.msExitFullscreen();
            } else if (fsDoc.mozCancelFullScreen) {
                fsDoc.mozCancelFullScreen();
            } else if (fsDoc.webkitExitFullscreen) {
                fsDoc.webkitExitFullscreen();
            }
        }
    }
}
