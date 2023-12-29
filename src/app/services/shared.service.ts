// shared.service.ts
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

export class SharedServiceSelectedSubreddit {
  private selectedSubredditSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  selectedSubreddit$: Observable<string> =
    this.selectedSubredditSubject.asObservable();

  updateSelectedSubreddit(data: string): void {
    this.selectedSubredditSubject.next(data);
  }
}
