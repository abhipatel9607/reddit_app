import { Component, OnChanges, OnInit } from '@angular/core';
import {
  SharedServiceSelectedSubreddit,
  SharedServiceSubreddits,
  CreatePostPopupService,
} from '..//services/shared.service';
import { SubredditType } from '../models/subraddit.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.css'],
})
export class CreatePostPopupComponent implements OnInit {
  user: any;
  selectedPostType: string = 'post';
  selectedSubredditForCreateNewPost: string = '';
  isOpenCreatePostPopup: boolean = false;
  subreddits: SubredditType[] = [];
  postTitle: string = '';
  postText: string = '';
  urlTitle: string = '';
  url: string = '';
  imgTitle: string = '';
  imgText: string = '';
  imgInputUrl: string = '';
  errText: string = '';

  constructor(
    private auth: AuthService,
    private sharedServiceSubreddits: SharedServiceSubreddits,
    private sharedServiceSelectedSubreddit: SharedServiceSelectedSubreddit,
    private createPostPopupService: CreatePostPopupService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.sharedServiceSubreddits.subredditsData$.subscribe(
      (subredditsData: SubredditType[]) => {
        this.subreddits = subredditsData;
        this.selectedSubredditForCreateNewPost =
          subredditsData.length > 0
            ? subredditsData[0].name
            : 'Select Subreddit';
      }
    );

    this.sharedServiceSelectedSubreddit.selectedSubreddit$.subscribe(
      (selectedSubreddit: string) => {
        console.log('koooooooooo', selectedSubreddit);
        if (selectedSubreddit !== 'Show All' && selectedSubreddit) {
          this.selectedSubredditForCreateNewPost = selectedSubreddit;
        }
      }
    );

    this.createPostPopupService.isOpenCreatePostPopup$.subscribe((isOpen) => {
      this.isOpenCreatePostPopup = isOpen;
    });
  }

  selectSubreddit(name) {
    this.selectedSubredditForCreateNewPost = name;
  }

  resetInputs() {
    this.postTitle = '';
    this.postText = '';
    this.urlTitle = '';
    this.url = '';
    this.imgTitle = '';
    this.imgText = '';
    this.imgInputUrl = '';
  }

  selectPostType(type: string) {
    this.resetInputs();
    this.selectedPostType = type;
  }

  hideCreatePostPopup() {
    this.createPostPopupService.updatePopupState(false);
  }

  formValidation() {
    if (this.selectedPostType === 'post') {
      if (!this.postTitle) {
        this.errText = 'Title is Required field';
        return false;
      } else if (!this.postText) {
        this.errText = 'Post Description is a Required field';
        return false;
      } else {
        return true;
      }
    } else if (this.selectedPostType === 'url') {
      if (!this.urlTitle) {
        this.errText = 'Title is Required field';
        return false;
      } else if (!this.url) {
        this.errText = 'URL is a Required field';
        return false;
      } else {
        return true;
      }
    } else if (this.selectedPostType === 'image') {
      if (!this.imgTitle) {
        this.errText = 'Title is Required field';
        return false;
      } else if (!this.imgText) {
        this.errText = 'Image Description is a Required field';
        return false;
      } else if (!this.imgInputUrl) {
        this.errText = 'Please choose an Image';
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  collectRequiredData() {
    let postData = {
      title: this.postTitle || this.urlTitle || this.imgTitle,
      content: this.postText || this.imgText,
      url: this.url,
      userId: this.user.uid,
      subRedditId: this.subreddits.find(
        (subreddit) => subreddit.name === this.selectedSubredditForCreateNewPost
      ).subredditId,
      userName: this.user.displayName,
      subredditName: this.selectedSubredditForCreateNewPost,
      upVoteCount: 0,
      downVoteCount: 0,
      img: this.imgInputUrl,
    };
    return postData;
  }

  createPost() {
    if (!this.formValidation()) {
      return;
    }
    this.errText = '';
    let postData = this.collectRequiredData();
    console.log(postData);
  }
}
