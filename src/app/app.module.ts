import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { PostComponent } from './home/post/post.component';
import {
  SharedServiceSelectedSubreddit,
  SharedServiceSubreddits,
  CreatePostPopupService,
} from './services/shared.service';
import { CreatePostPopupComponent } from './create-post-popup/create-post-popup.component';
import { CreateSubredditPopupComponent } from './create-subreddit-popup/create-subreddit-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreatePostComponent,
    PostComponent,
    CreatePostPopupComponent,
    CreateSubredditPopupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [
    SharedServiceSubreddits,
    SharedServiceSelectedSubreddit,
    CreatePostPopupService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
