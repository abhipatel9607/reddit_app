import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { updateData } from 'src/app/firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { ShowCommentService } from 'src/app/services/shared.service';

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
  showCommentSection: boolean = true;

  @Input() post: any;

  private updateInProgress = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private showCommentService: ShowCommentService
  ) {}

  ngOnInit() {
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
      this.voteScore =
        this.post.upVotedUsers.length - this.post.downVotedUsers.length;
    });
  }

  openPostDetail(postId: string) {
    if (this.post.postId) {
      this.router.navigate(['/post-detail', postId]);
    } else {
      this.showCommentSection = !this.showCommentSection;
      this.showCommentService.updateCommentState(this.showCommentSection);
    }
  }

  async onUpVote() {
    if (this.updateInProgress) {
      return;
    }

    this.updateInProgress = true;

    try {
      if (this.upVote) {
        const dataToBeUpdate = {
          upVotedUsers: this.post.upVotedUsers.filter(
            (id: string) => id !== this.userId
          ),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.upVote = false;
        this.voteScore--;
      } else if (this.downVote) {
        const dataToBeUpdate = {
          upVotedUsers: this.addUserId(this.post.upVotedUsers),

          downVotedUsers: this.post.downVotedUsers.filter(
            (id: string) => id !== this.userId
          ),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.upVote = true;
        this.downVote = false;
        this.voteScore += 2;
      } else {
        const dataToBeUpdate = {
          upVotedUsers: this.addUserId(this.post.upVotedUsers),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.upVote = true;
        this.voteScore += 1;
      }
    } finally {
      this.updateInProgress = false;
    }
  }

  async onDownVote() {
    if (this.updateInProgress) {
      return;
    }

    this.updateInProgress = true;

    try {
      if (this.downVote) {
        const dataToBeUpdate = {
          downVotedUsers: this.post.downVotedUsers.filter(
            (id: string) => id !== this.userId
          ),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.downVote = false;
        this.voteScore++;
      } else if (this.upVote) {
        const dataToBeUpdate = {
          downVotedUsers: this.addUserId(this.post.downVotedUsers),
          upVotedUsers: this.post.upVotedUsers.filter(
            (id: string) => id !== this.userId
          ),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.downVote = true;
        this.upVote = false;
        this.voteScore -= 2;
      } else {
        const dataToBeUpdate = {
          downVotedUsers: this.addUserId(this.post.downVotedUsers),
        };

        const pId: string = this.post.postId ? this.post.postId : this.postId;
        await updateData('post', pId, dataToBeUpdate);

        this.downVote = true;
        this.voteScore -= 1;
      }
    } finally {
      this.updateInProgress = false;
    }
  }

  addUserId(arr: string[]) {
    if (!arr.includes(this.userId)) {
      return [...arr, this.userId];
    } else {
      return arr;
    }
  }
}
