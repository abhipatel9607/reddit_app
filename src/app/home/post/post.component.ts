import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { updateData } from 'src/app/firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  userId: any;
  postId: string;
  upVote: boolean = false;
  downVote: boolean = false;
  voteScore: number = 0;

  @Input() post: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log('post', this.post);
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('postId');
    });
    this.auth.user$.subscribe((user) => {
      this.userId = user?.uid;
      if (this.post.upVotedUsers.includes(this.userId)) {
        this.upVote = true;
      }
      if (this.post.downVotedUsers.includes(this.userId)) {
        this.downVote = true;
      }
      this.voteScore = this.post.upVoteCount - this.post.downVoteCount;
    });
  }

  openPostDetail(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }

  async onUpVote() {
    if (this.upVote) {
      // User has already upvoted, cancel the upvote
      this.upVote = false;
      this.voteScore--;

      const dataToBeUpdate = {
        upVotedUsers: this.post.upVotedUsers.filter(
          (id: string) => id !== this.userId
        ),
        upVoteCount: this.post.upVoteCount - 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);

      // Perform any other logic, e.g., update vote count in the database
    } else if (this.downVote) {
      // User has downvoted and clicks upvote, toggle upVote and remove downVote
      this.upVote = true;
      this.downVote = false;
      this.voteScore += 2;

      const dataToBeUpdate = {
        upVotedUsers: [...this.post.upVotedUsers, this.userId],
        downVotedUsers: this.post.downVotedUsers.filter(
          (id: string) => id !== this.userId
        ),
        upVoteCount: this.post.upVoteCount + 1,
        downVoteCount: this.post.downVoteCount - 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);

      // Perform any other logic, e.g., update vote count in the database
    } else {
      // User hasn't upvoted, toggle upVote
      this.upVote = true;
      this.voteScore++;

      const dataToBeUpdate = {
        upVotedUsers: [...this.post.upVotedUsers, this.userId],
        upVoteCount: this.post.upVoteCount + 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);
      // Perform any other logic, e.g., update vote count in the database
    }
  }

  async onDownVote() {
    if (this.downVote) {
      // User has already downvoted, cancel the downvote
      this.downVote = false;
      this.voteScore++;

      const dataToBeUpdate = {
        downVotedUsers: this.post.downVotedUsers.filter(
          (id: string) => id !== this.userId
        ),
        downVoteCount: this.post.downVoteCount - 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);

      // Perform any other logic, e.g., update vote count in the database
    } else if (this.upVote) {
      // User has upvoted and clicks downvote, toggle downVote and remove upVote
      this.downVote = true;
      this.upVote = false;
      this.voteScore -= 2;

      const dataToBeUpdate = {
        downVotedUsers: [...this.post.downVotedUsers, this.userId],
        upVotedUsers: this.post.upVotedUsers.filter(
          (id: string) => id !== this.userId
        ),
        upVoteCount: this.post.upVoteCount - 1,
        downVoteCount: this.post.downVoteCount + 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);
      // Perform any other logic, e.g., update vote count in the database
    } else {
      // User hasn't downvoted, toggle downVote
      this.downVote = true;
      this.voteScore--;

      const dataToBeUpdate = {
        downVotedUsers: [...this.post.downVotedUsers, this.userId],
        downVoteCount: this.post.downVoteCount + 1,
      };

      const pId: string = this.post.postId ? this.post.postId : this.postId;
      const updatedData = await updateData('post', pId, dataToBeUpdate);
      // Perform any other logic, e.g., update vote count in the database
    }
  }
}
