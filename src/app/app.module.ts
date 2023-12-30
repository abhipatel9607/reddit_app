import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
  SearchPostInputService,
} from './services/shared.service';
import { CreatePostPopupComponent } from './create-post-popup/create-post-popup.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreatePostComponent,
    PostComponent,
    CreatePostPopupComponent,
    PostDetailComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    SharedServiceSubreddits,
    SharedServiceSelectedSubreddit,
    CreatePostPopupService,
    SearchPostInputService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
