import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findById } from '../firebase/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  userId: string;
  postId: string;
  post: any;
  upVote: boolean = false;
  downVote: boolean = false;
  voteScore: number;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.postId = params['postId'];
      await this.loadPost();
    });
  }

  async loadPost() {
    const post = await findById('post', this.postId);
    this.post = post;
    this.auth.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.voteScore = post['upVoteCount'] - post['downVoteCount'];
      if (this.post.upVotedUsers.includes(this.userId)) {
        this.upVote = true;
      }
      if (this.post.downVotedUsers.includes(this.userId)) {
        this.downVote = true;
      }
    });
    console.log('Post Fetch successfully', post);
  }

  openPostDetail(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }

  async onUpVote() {
    if (this.upVote) {
      // User has already upvoted, cancel the upvote
      this.upVote = false;

      // Perform any other logic, e.g., update vote count in the database
    } else if (this.downVote) {
      // User has downvoted and clicks upvote, toggle upVote and remove downVote
      this.upVote = true;
      this.downVote = false;

      // Perform any other logic, e.g., update vote count in the database
    } else {
      // User hasn't upvoted, toggle upVote
      this.upVote = true;

      // Perform any other logic, e.g., update vote count in the database
    }
  }

  async onDownVote() {
    if (this.downVote) {
      // User has already downvoted, cancel the downvote
      this.downVote = false;

      // Perform any other logic, e.g., update vote count in the database
    } else if (this.upVote) {
      // User has upvoted and clicks downvote, toggle downVote and remove upVote
      this.downVote = true;
      this.upVote = false;

      // Perform any other logic, e.g., update vote count in the database
    } else {
      // User hasn't downvoted, toggle downVote
      this.downVote = true;

      // Perform any other logic, e.g., update vote count in the database
    }
  }
}
