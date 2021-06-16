import { Injectable } from '@angular/core';

import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore ) {}

 initAuthListerne(): any {
   this.auth.authState.subscribe( fuser => {
     console.log( fuser );
     console.log( fuser?.uid );
     console.log( fuser?.email );
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
