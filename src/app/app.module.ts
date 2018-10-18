import { FullscreenService } from './services/fullscreen.service';
import { EmbedService } from './services/embed.service';
import { ChannelService } from './services/channel.service';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { WatchTvComponent } from './watch-tv/watch-tv.component';
import { WatchTvService } from './watch-tv/watch-tv.service';
import { ScreenComponent } from './screen/screen.component';
import { CommentTreeComponent } from './comment-tree/comment-tree.component';
import { CommentComponent } from './comment-tree/comment/comment.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';

import { EmbedableDirective } from './embedable/embedable.directive';
import { VimeoComponent } from './embedable/vimeo/vimeo.component';
import { RedditComponent } from './embedable/reddit/reddit.component';
import { ImgurComponent } from './embedable/imgur/imgur.component';
import { GfycatComponent } from './embedable/gfycat/gfycat.component';
import { DailymotionComponent } from './embedable/dailymotion/dailymotion.component';
import { YoutubeComponent } from './embedable/youtube/youtube.component';
import { TwitterComponent } from './embedable/twitter/twitter.component';

const appRoutes: Routes = [
    { path: '', component: WatchTvComponent },
    { path: '**', component: WatchTvComponent }
];

@NgModule({
  declarations: [
    AppComponent,
      WatchTvComponent,
      ScreenComponent,
      CommentTreeComponent,
      CommentComponent,
      EmbedableDirective,
      YoutubeComponent,
      RedditComponent,
      VimeoComponent,
      DailymotionComponent,
      GfycatComponent,
      ImgurComponent,
      TwitterComponent
  ],
    imports: [
    FormsModule,
    MatInputModule,
    MatChipsModule,
    HttpClientModule,
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBottomSheetModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
  ],
    providers: [
    WatchTvService,
    ChannelService,
    EmbedService,
    FullscreenService
    ],
    entryComponents: [
        CommentTreeComponent,
        YoutubeComponent,
        RedditComponent,
        VimeoComponent,
        DailymotionComponent,
        GfycatComponent,
        ImgurComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
