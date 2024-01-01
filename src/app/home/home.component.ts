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
  sortBy: string = 'latest';

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

    this.searchPostInputService.searchPostsInput$.subscribe((searchTitle) => {
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

  private updateFinalPostsToRender(): void {
    if (this.selectedSubreddit !== 'Show All') {
      this.finalPostsToRender = this.allPost.filter(
        (post) => post.subredditName === this.selectedSubreddit
      );
    } else {
      this.finalPostsToRender = this.allPost;
    }

    const searchTitle = this.searchPostInputService.getCurrentSearchInput();

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
  }

  private async loadPosts(): Promise<void> {
    try {
      const posts = await getAllData('post');
      this.allPost = posts;
      this.finalPostsToRender = posts.reverse();
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  sortOnLatest() {
    this.sortBy = 'latest';
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => b.createdAt - a.createdAt
    );
  }
  sortOnOldest() {
    this.sortBy = 'oldest';
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => a.createdAt - b.createdAt
    );
  }
  sortOnVote() {
    this.sortBy = 'popular';
    this.finalPostsToRender = this.finalPostsToRender.map((post) => {
      const voteCount: number =
        post.upVotedUsers.length - post.downVotedUsers.length;
      post.voteScore = voteCount;
      return post;
    });
    this.finalPostsToRender = this.finalPostsToRender.sort(
      (a, b) => b.voteScore - a.voteScore
    );
  }
}
