import { Injectable } from '@angular/core';
import { app } from '../firebase/firebase.config';
import {
  getAuth,
  signInWithRedirect,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth(app);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async login() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      window.location.reload();
    } catch (error) {
      console.log('LogOut failed');
    }
  }
}
