import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findById, updateData } from '../firebase/firestore';
import { AuthService } from '../services/auth.service';
import { ShowCommentService } from '../services/shared.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  user: any;
  postId: string;
  post: any;
  errText: string;
  commentInput: string = '';
  isShowComment: boolean;
  showEditCommentPopup: boolean = false;
  isOpenLoginPopup: boolean = false;
  editCommentInput: string = '';
  selectedCommentToEdit: any;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private showCommentService: ShowCommentService
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.postId = params['postId'];
      await this.loadPost();
    });
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
    this.showCommentService.isShowComment$.subscribe((state) => {
      this.isShowComment = state;
    });
  }

  async loadPost() {
    const post = await findById('post', this.postId);
    this.post = post;
  }

  openPostDetail(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }

  async onSaveComment() {
    if (!this.commentInput) {
      this.errText = '* Please enter a comment';
      return;
    } else if (!navigator.onLine) {
      this.errText =
        '* Network is offline. Please check your internet connection.';
      return;
    } else {
      this.errText = '';
    }

    const newCommentData = {
      commentId: uuidv4(),
      createdAt: Date.now(),
      editedAt: Date.now(),
      author: this.user.displayName,
      authorUserId: this.user.uid,
      authorImg: this.user.photoURL,
      commentText: this.commentInput,
      upVotedUsers: [this.user.uid],
      downVotedUsers: [],
      comments: [],
    };
    const dataToBeUpdate = {
      comments: [...this.post.comments, newCommentData],
    };
    await updateData('post', this.postId, dataToBeUpdate);
    this.commentInput = '';
    this.loadPost();
  }

  async handleDeleteComment(commentId: string) {
    const dataToBeUpdate = {
      comments: this.post.comments.filter(
        (comment: any) => comment.commentId !== commentId
      ),
    };
    await updateData('post', this.postId, dataToBeUpdate);
    this.loadPost();
  }

  handleOpenEditCommentPopup(commentData: any) {
    this.errText = '';
    this.showEditCommentPopup = true;
    this.editCommentInput = commentData.commentText;
    this.selectedCommentToEdit = commentData;
  }
  onClosePopup() {
    this.showEditCommentPopup = false;
    this.editCommentInput = '';
    this.selectedCommentToEdit = undefined;
    this.errText = '';
  }
  onEditComment() {
    if (!this.editCommentInput) {
      this.errText = '* Please enter a comment';
      return;
    } else if (!navigator.onLine) {
      this.errText =
        '* Network is offline. Please check your internet connection.';
      return;
    } else {
      this.errText = '';
    }

    const index = this.post.comments.indexOf(this.selectedCommentToEdit);

    this.selectedCommentToEdit.commentText = this.editCommentInput;
    this.selectedCommentToEdit.editedAt = Date.now();

    const updatedCommentsData = [...this.post.comments];
    updatedCommentsData[index] = this.selectedCommentToEdit;

    const updatedPost = {
      ...this.post,
      comments: updatedCommentsData,
    };

    updateData('post', this.postId, updatedPost);

    this.showEditCommentPopup = false;
    this.editCommentInput = '';
    this.selectedCommentToEdit = undefined;
  }

  onCloseLoginPopup() {
    this.isOpenLoginPopup = false;
  }
  onOpenLoginPopup() {
    this.isOpenLoginPopup = true;
  }
  async onUserLogin(): Promise<void> {
    try {
      await this.auth.login();
      this.isOpenLoginPopup = false;
      await this.loadPost();
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
