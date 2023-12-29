import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { createData, getAllData } from '../firebase/firestore';
import { SubredditType } from '../models/subraddit.model';
import {
  SharedServiceSubreddits,
  SharedServiceSelectedSubreddit,
} from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;
  errText: string;
  communityInput: string = '';
  showCreateCommunityPopup: boolean = false;
  selectedCommunity: string = 'Show All';
  subreddits: SubredditType[] = [];

  constructor(
    private auth: AuthService,
    private sharedServiceSubreddits: SharedServiceSubreddits,
    private sharedServiceSelectedSubreddit: SharedServiceSelectedSubreddit
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });

    this.loadSubreddits();
  }

  async userLogin(): Promise<void> {
    try {
      console.log('Logging in...');
      await this.auth.login();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async userLogout(): Promise<void> {
    try {
      console.log('Logging out...');
      await this.auth.logout();
      this.user = null;
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async createCommunity() {
    if (!this.communityInput) {
      this.errText = 'This is a Required field';
    } else if (!navigator.onLine) {
      this.errText =
        'Network is offline. Please check your internet connection.';
    } else {
      this.errText = '';
      const data = { name: this.communityInput, userId: this.user.uid };
      let createdData = await createData('subreddit', data);
      await this.loadSubreddits();
      console.log('Community Created', createData);
      this.communityInput = '';
      this.showCreateCommunityPopup = false;
    }
  }

  closeCreateCommunityPopup() {
    this.errText = '';
    this.communityInput = '';
    this.showCreateCommunityPopup = false;
  }

  async loadSubreddits(): Promise<void> {
    const allCommunities = await getAllData('subreddit');
    this.subreddits = allCommunities;
    // this.selectedCommunity = allCommunities[allCommunities.length - 1].name;
    console.log(allCommunities);

    this.sharedServiceSubreddits.updateSubredditsData(allCommunities);
  }

  click(name: string) {
    this.selectedCommunity = name;
    this.sharedServiceSelectedSubreddit.updateSelectedSubreddit(name);
  }
}
