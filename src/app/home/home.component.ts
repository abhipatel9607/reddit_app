import { Component, OnDestroy, OnInit } from '@angular/core';
import { getAllData } from '../firebase/firestore';
import {
  SharedServiceSelectedSubreddit,
  SearchPostInputService,
} from '../services/shared.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any;
  allPost: any[] = [];
  finalPostsToRender: any[] = [];
  selectedSubreddit: string;
  private subscription: Subscription;

  constructor(
    private sharedServiceSelectedSubreddit: SharedServiceSelectedSubreddit,
    private searchPostInputService: SearchPostInputService,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadPosts();
    this.subscription =
      this.sharedServiceSelectedSubreddit.selectedSubreddit$.subscribe(
        (selectedSubreddit) => {
          this.selectedSubreddit = selectedSubreddit;
          this.updateFinalPostsToRender();
        }
      );

    // Subscribe to changes in the searchPostsInput
    this.searchPostInputService.searchPostsInput$.subscribe((searchTitle) => {
      // Update the searchTitle and refresh the posts
      this.updateFinalPostsToRender();
    });

    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // private updateFinalPostsToRender(): void {
  //   if (this.selectedSubreddit !== 'Show All') {
  //     this.finalPostsToRender = this.allPost.filter(
  //       (post) => post.subredditName === this.selectedSubreddit
  //     );
  //   } else {
  //     this.finalPostsToRender = this.allPost;
  //   }
  // }

  private updateFinalPostsToRender(): void {
    if (this.selectedSubreddit !== 'Show All') {
      this.finalPostsToRender = this.allPost.filter(
        (post) => post.subredditName === this.selectedSubreddit
      );
    } else {
      this.finalPostsToRender = this.allPost;
    }

    // Retrieve the searchTitle from the service
    const searchTitle = this.searchPostInputService.getCurrentSearchInput();

    // Filter based on the searchTitle if it is provided
    if (searchTitle) {
      this.finalPostsToRender = this.finalPostsToRender.filter(
        (post) =>
          post.title
            .toLocaleLowerCase()
            .includes(searchTitle.toLocaleLowerCase()) ||
          post.content
            .toLocaleLowerCase()
            .includes(searchTitle.toLocaleLowerCase()) ||
          this.user.displayName
            .toLocaleLowerCase()
            .includes(searchTitle.toLocaleLowerCase())
      );
    }
    console.log(this.finalPostsToRender);
  }

  private async loadPosts(): Promise<void> {
    try {
      const posts = await getAllData('post');
      this.allPost = posts;
      this.finalPostsToRender = posts.reverse();
    } catch (error) {
      console.error('Error loading posts:', error);
      // Handle the error (e.g., display an error message)
    }
  }

  sortOnLatest() {
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }
  sortOnOldest() {
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => a.createdAt - b.createdAt
    );
  }
  sortOnVote() {
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => b.upVoteCount - a.upVoteCount
    );
  }
}
