import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: any;

  constructor(private router: Router) {}

  openPostDetail(postId: string) {
    this.router.navigate(['/post-detail', postId]);
  }
}
