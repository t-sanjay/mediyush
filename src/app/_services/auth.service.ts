import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('userMed', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('userMed') || '{}');
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        return true;
      });
  }

  getUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.valueChanges();
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      admin: false,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  resetPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userMed'));
    return user !== null;
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('userMed');
      this.router.navigateByUrl('');
    });
  }
}
