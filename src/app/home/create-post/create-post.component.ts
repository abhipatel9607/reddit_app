import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  SharedServiceSelectedSubreddit,
  SharedServiceSubreddits,
} from '../../services/shared.service';
import { SubredditType } from 'src/app/models/subraddit.model';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  user: any;
  selectedSubredditForCreateNewPost: string = '';
  selectedPostType: string = 'post';
  isOpenCreatePostPopup: boolean = false;
  subreddits: SubredditType[] = [];

  selectPostType(type: string) {
    this.selectedPostType = type;
  }

  constructor(
    private auth: AuthService,
    private sharedServiceSubreddits: SharedServiceSubreddits,
    private sharedServiceSelectedSubreddit: SharedServiceSelectedSubreddit
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
  }

  selectSubreddit(name) {
    this.selectedSubredditForCreateNewPost = name;
  }
}
