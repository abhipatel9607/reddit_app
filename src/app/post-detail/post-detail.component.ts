import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { findById } from '../firebase/firestore';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent {
  postId: string;
  post: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.postId = params['postId'];
      this.loadPost();
    });
  }

  async loadPost() {
    const post = await findById('post', this.postId);
    this.post = post;
    console.log('Post Fetch successfully', post);
  }
}
