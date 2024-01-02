import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { createData, getAllData } from '../firebase/firestore';
import { SubredditType } from '../models/subreddit.model';
import {
  SharedServiceSubreddits,
  SharedServiceSelectedSubreddit,
  SearchPostInputService,
} from '../services/shared.service';
import { Router } from '@angular/router';

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
  searchPostsInput: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private searchPostInputService: SearchPostInputService,
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
      await this.auth.login();
    } catch (error) {
      console.error('Login failed', error);
    }
  }

  async userLogout(): Promise<void> {
    try {
      await this.auth.logout();
      this.user = null;
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async createCommunity() {
    if (!this.communityInput) {
      this.errText = '* This is a Required field';
      return;
    } else if (!navigator.onLine) {
      this.errText =
        '* Network is offline. Please check your internet connection.';
      return;
    } else {
      this.errText = '';
      const data = { name: this.communityInput, userId: this.user.uid };
      let createdData = await createData('subreddit', data);

      console.log(createdData, createdData.id);
      await this.loadSubreddits();
      const createdSubredditData = this.subreddits.find(
        (subreddit) => subreddit.subredditId === createdData.id
      );
      this.selectedCommunity = createdSubredditData.name;
      this.sharedServiceSelectedSubreddit.updateSelectedSubreddit(
        this.selectedCommunity
      );
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
    const subReddits = await getAllData('subreddit');
    this.subreddits = subReddits;
    this.sharedServiceSubreddits.updateSubredditsData(subReddits);
  }

  onSearchPostsInputChange() {
    this.searchPostInputService.updateSearchPostsInput(this.searchPostsInput);
    this.router.navigate(['/home']);
  }

  onChangeSelectedSubreddit(name: string) {
    this.selectedCommunity = name;
    this.sharedServiceSelectedSubreddit.updateSelectedSubreddit(name);
    this.router.navigate(['/home']);
  }

  goToHome() {
    this.selectedCommunity = 'Show All';
    this.sharedServiceSelectedSubreddit.updateSelectedSubreddit('Show All');
    this.router.navigate(['/home']);
  }
}
