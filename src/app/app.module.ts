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
} from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CreatePostComponent,
    PostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
  providers: [SharedServiceSubreddits, SharedServiceSelectedSubreddit],
  bootstrap: [AppComponent],
})
export class AppModule {}
