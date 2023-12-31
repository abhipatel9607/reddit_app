import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  userId: any;
  upVote: boolean = false;
  downVote: boolean = false;

  @Input() post: any;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      this.userId = user?.uid;
      if (this.post.upVotedUsers.includes(this.userId)) {
        this.upVote = true;
      }
      if (this.post.downVotedUsers.includes(this.userId)) {
        this.downVote = true;
      }
    });
  }

  openPostDetail(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }
}
