import { Component } from '@angular/core';
import { CreatePostPopupService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'reddit_app';
  isOpenCreatePostPopup: boolean;

  constructor(private createPostPopupService: CreatePostPopupService) {}

  ngOnInit(): void {
    this.createPostPopupService.isOpenCreatePostPopup$.subscribe((isOpen) => {
      this.isOpenCreatePostPopup = isOpen;
    });
  }
}
