import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CreatePostPopupService } from '../../services/shared.service';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  user: any;
  selectedPostType: string = 'post';
  isOpenCreatePostPopup: boolean = false;

  constructor(
    private auth: AuthService,
    private createPostPopupService: CreatePostPopupService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  selectPostType(type: string) {
    this.selectedPostType = type;
  }

  showCreatePostPopup() {
    this.isOpenCreatePostPopup = true;
    this.createPostPopupService.updatePopupState(true);
  }
}
