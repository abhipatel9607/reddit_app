import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SubredditType } from '../models/subraddit.model';

@Injectable({
  providedIn: 'root',
})
export class SharedServiceSubreddits {
  private subredditsDataSubject: BehaviorSubject<SubredditType[]> =
    new BehaviorSubject<SubredditType[]>([]);
  subredditsData$: Observable<SubredditType[]> =
    this.subredditsDataSubject.asObservable();

  updateSubredditsData(data: SubredditType[]): void {
    this.subredditsDataSubject.next(data);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SharedServiceSelectedSubreddit {
  private selectedSubredditSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  selectedSubreddit$: Observable<string> =
    this.selectedSubredditSubject.asObservable();

  updateSelectedSubreddit(data: string): void {
    this.selectedSubredditSubject.next(data);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CreatePostPopupService {
  private isOpenCreatePostPopupSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isOpenCreatePostPopup$: Observable<boolean> =
    this.isOpenCreatePostPopupSubject.asObservable();

  constructor() {
    this.updatePopupState(false);
  }

  updatePopupState(isOpen: boolean): void {
    console.log('Popup State Updated:', isOpen);
    this.isOpenCreatePostPopupSubject.next(isOpen);
  }
}

@Injectable({
  providedIn: 'root',
})
export class CreateSubredditPopupService {
  private isOpenCreateSubredditPopupSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isOpenCreateSubredditPopup$: Observable<boolean> =
    this.isOpenCreateSubredditPopupSubject.asObservable();

  constructor() {
    this.updatePopupState(false);
  }

  updatePopupState(isOpen: boolean): void {
    console.log('Subreddit Popup State Updated:', isOpen);
    this.isOpenCreateSubredditPopupSubject.next(isOpen);
  }
}