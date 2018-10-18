import { EmbedableComponent } from './../embedable/embedableComponent';
import { Video } from './../services/channel.service';
import { Component, Input, OnChanges, SimpleChanges, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';
import { EmbedService } from '../services/embed.service';
import { EmbedableDirective } from '../embedable/embedable.directive';

@Component({
  selector: 'rtv-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnChanges {
    @Input() video: Video;
    @ViewChild(EmbedableDirective) embedable: EmbedableDirective;
    link: string;
    
    constructor(private embedService: EmbedService, private componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.video && this.video.url) {
            this.loadScreen(this.video, this.embedService.getEmbedableComponent(new URL(this.video.url)));
        }
    }

    loadScreen(video: Video, component: any) {
        console.log(video.url);
        const viewContainerRef = this.embedable.viewContainerRef;
        viewContainerRef.clear();

        if (component) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<EmbedableComponent>componentRef.instance).url = video.url;
        } else {
            this.link = video.url;
        }
    }
}
