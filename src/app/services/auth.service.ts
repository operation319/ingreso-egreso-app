import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscriotion: Subscription;

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) {}

 initAuthListerne(): any {
   this.auth.authState.subscribe( fuser => {
      if ( fuser ) {
      // Existe
      this. userSubscriotion = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {

          console.log({firestoreUser});

          const user = Usuario.fromFirebase( firestoreUser );
          this.store.dispatch( authActions.setUser({ user }) );
        });

    } else {
      // No Existe
      this. userSubscriotion.unsubscribe();
      this.store.dispatch( authActions.unsetUser() );
    }

   });
 }

  crearUsuario( nombre: string, email: string, contraseña: string ): any {

    // console.log({ nombre, email, contraseña });
    return this.auth.createUserWithEmailAndPassword( email, contraseña )
          .then( ({ user }) => {

            const newUser = new Usuario( user.uid, nombre, user.email );

            return this.firestore.doc(`${ user.uid }/usuario`).set({...newUser});

          });
  }

  loginUsuario( email: string, contraseña: string ): any {
    return this.auth.signInWithEmailAndPassword( email, contraseña);
  }


  logout(): any {
   return this.auth.signOut();
  }

  isAuth(): any {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }

}
