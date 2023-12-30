import { Component } from '@angular/core';
import { getAllData } from '../firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  allPosts: any[] = [];

  async loadPosts(): Promise<void> {
    const posts = await getAllData('post');
    this.allPosts = posts;
    console.log(posts);

    // this.sharedServicePosts.updatePostsData(posts);
  }
}
