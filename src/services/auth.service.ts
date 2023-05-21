import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

//NGRX
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import * as actions from '../app/auth/auth.actions';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: Subscription = new Subscription();

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      // console.log(fuser?.uid);
      if (fuser) {
        //get user from firestore
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges().subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this.store.dispatch(actions.setUser({ user }));
        });
      } else {
        this.store.dispatch(actions.unSetUser());
        this.userSubscription.unsubscribe();
      }
    });
  }

  createUser(name: string, email: string, password: string) {
    // console.log({name, email, password});

    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = {
          uid: user?.uid,
          name,
          email,
        };
        return this.firestore.doc(`${user?.uid}/user`).set({ ...newUser });
      });
  }

  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuthenticated() {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
