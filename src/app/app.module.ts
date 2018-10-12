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
      CommentComponent
  ],
    imports: [
        HttpClientModule,
    BrowserModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
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
        EmbedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
