import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { WatchTvComponent } from './watch-tv/watch-tv.component';

const appRoutes: Routes = [
    { path: '', component: WatchTvComponent },
    { path: '**', component: WatchTvComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WatchTvComponent
  ],
  imports: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
