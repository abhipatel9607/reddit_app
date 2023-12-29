import { Component } from '@angular/core';
import {
  SharedServiceSelectedSubreddit,
  SharedServiceSubreddits,
  CreatePostPopupService,
} from '..//services/shared.service';
import { SubredditType } from '../models/subraddit.model';

@Component({
  selector: 'create-post-popup',
  templateUrl: './create-post-popup.component.html',
  styleUrls: ['./create-post-popup.component.css'],
})
export class CreatePostPopupComponent {
  selectedPostType: string = 'post';
  selectedSubredditForCreateNewPost: string = '';
  isOpenCreatePostPopup: boolean = false;
  subreddits: SubredditType[] = [];

  constructor(
    private sharedServiceSubreddits: SharedServiceSubreddits,
    private sharedServiceSelectedSubreddit: SharedServiceSelectedSubreddit,
    private createPostPopupService: CreatePostPopupService
  ) {}

  ngOnInit(): void {
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

  selectPostType(type: string) {
    this.selectedPostType = type;
  }

  hideCreatePostPopup() {
    this.createPostPopupService.updatePopupState(false);
  }
}
