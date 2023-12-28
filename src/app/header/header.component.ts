import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.user = user;
    });
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
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}
