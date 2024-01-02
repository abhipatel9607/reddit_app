import { Component, EventEmitter, Input, Output } from '@angular/core';
import { updateData } from 'src/app/firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css'],
})
export class CommentItemComponent {
  user: any;
  userId: string;
  upVote: boolean = false;
  downVote: boolean = false;
  voteScore: number = 0;

  @Input() comment: any;
  @Input() post: any;
  @Input() postId: string;
  @Output() openEditPopupCommentEvent = new EventEmitter<any>();
  @Output() deleteCommentEvent = new EventEmitter<string>();
  @Output() onOpenLoginPopup = new EventEmitter();

  private updateInProgress = false;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      this.userId = user?.uid;
    });
    this.voteScore =
      this.comment.upVotedUsers.length - this.comment.downVotedUsers.length;
    this.upVote = this.comment.upVotedUsers.includes(this.userId);
    this.downVote = this.comment.downVotedUsers.includes(this.userId);
  }

  onOpenEditPopup() {
    this.openEditPopupCommentEvent.emit(this.comment);
  }

  onDeleteComment() {
    this.deleteCommentEvent.emit(this.comment.commentId);
  }

  // Vote Logics

  async onUpVote() {
    if (!this.user) {
      this.onOpenLoginPopup.emit(this.comment.commentId);
      return;
    }
    if (this.updateInProgress) {
      return;
    }

    this.updateInProgress = true;
    const index = this.post.comments.indexOf(this.comment);

    try {
      if (this.upVote) {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                upVotedUsers: comment.upVotedUsers.filter(
                  (id: string) => id !== this.userId
                ),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

        this.upVote = false;
        this.voteScore--;
      } else if (this.downVote) {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                upVotedUsers: this.addUserId(comment.upVotedUsers),
                downVotedUsers: comment.upVotedUsers.filter(
                  (id: string) => id !== this.userId
                ),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

        this.upVote = true;
        this.downVote = false;
        this.voteScore += 2;
      } else {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                upVotedUsers: this.addUserId(comment.upVotedUsers),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

        this.upVote = true;
        this.voteScore += 1;
      }
    } finally {
      this.updateInProgress = false;
    }
  }

  async onDownVote() {
    if (!this.user) {
      this.onOpenLoginPopup.emit(this.comment.commentId);
      return;
    }
    if (this.updateInProgress) {
      return;
    }

    this.updateInProgress = true;
    const index = this.post.comments.indexOf(this.comment);

    try {
      if (this.downVote) {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                downVotedUsers: comment.downVotedUsers.filter(
                  (id: string) => id !== this.userId
                ),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

        this.downVote = false;
        this.voteScore++;
      } else if (this.upVote) {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                downVotedUsers: this.addUserId(comment.downVotedUsers),
                upVotedUsers: comment.upVotedUsers.filter(
                  (id: string) => id !== this.userId
                ),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

        this.downVote = true;
        this.upVote = false;
        this.voteScore -= 2;
      } else {
        const dataToBeUpdate = {
          ...this.post,
          comments: this.post.comments.map((comment: any) => {
            if (this.comment === comment) {
              return {
                ...comment,
                downVotedUsers: this.addUserId(comment.downVotedUsers),
              };
            } else {
              return comment;
            }
          }),
        };

        await updateData('post', this.postId, dataToBeUpdate);

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
