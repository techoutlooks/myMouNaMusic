import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods,AngularFire } from 'angularfire2';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  public authState: FirebaseAuthState;

  constructor(public auth$: AngularFireAuth,public af:AngularFire,public platform:Platform,public fb:Facebook) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

   signInWithFacebook(){
    if (this.platform.is('cordova')) {
       this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
         firebase.auth().signInWithCredential(facebookCredential).then(res => {
                   this.af.database.object('/users/'+this.authState.uid).subscribe(res => {
                     if(res.role){}
                      else{
                                   this.af.database.object('/users/'+this.authState.uid+'/role').set(0);
                      }
                   })
      })
      });
      
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      }).then(res => {
                   this.af.database.object('/users/'+this.authState.uid).subscribe(res => {
                     if(res.role){}
                      else{
                                   this.af.database.object('/users/'+this.authState.uid+'/role').set(0);
                      }
                   })
      })
    }

  }


  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(res => {
                   this.af.database.object('/users/'+this.authState.uid).subscribe(res => {
                     if(res.role){}
                      else{
                                   this.af.database.object('/users/'+this.authState.uid+'/role').set(0);
                      }
                   })
      })
  }

  registerUser(email,password,password2): firebase.Promise<FirebaseAuthState> {
    
  return this.auth$.createUser({
    email: email,
    password: password
  })
  .then((res: FirebaseAuthState) => {
    this.af.database.object('/users/'+this.authState.uid).subscribe(res => {
                     if(res.role){}
                      else{
                                   this.af.database.object('/users/'+this.authState.uid+'/role').set(0);
                      }
                   })

    return res;

  })
  .catch((error) => {
    throw error;
    });



}

  signIn(email,password): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(res => {
                   this.af.database.object('/users/'+this.authState.uid).subscribe(res => {
                     if(res.role){}
                      else{
                                   this.af.database.object('/users/'+this.authState.uid+'/role').set(0);
                      }
                   })
      })
      .catch((error) => {
    throw error;

    });
  }

  signOut(): void {
    this.auth$.logout();

    
  }

  forgotPassword(email): firebase.Promise<FirebaseAuthState> {
    return firebase.app().auth().sendPasswordResetEmail(email)
    .then( (s) => {
      alert("Check your inbox to reset your password");
    })
    .catch( (error) => {
      throw error
    })

    
  }

  displayName(): string {
    if (this.authState != null) {
      return this.authState.uid;
    } else {
      return '';
    }
  }
}