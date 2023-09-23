import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import {TabsPage} from '../tabs/tabs'

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Storage } from '@ionic/storage';



import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
loginData:any;
registerData:any;
registerPage: boolean=false
  constructor(public bg:BackgroundMode,public storage: Storage ,public navCtrl: NavController, public navParams: NavParams,af: AngularFire,private _auth: AuthService,
  platform: Platform, splashScreen: SplashScreen) {

        platform.ready().then(() => {


            
       platform.registerBackButtonAction(() => {
            if(this.navCtrl.canGoBack()){
              this.navCtrl.pop();
            }
           else{
              this.bg.moveToBackground();
            }
          });
   


if (splashScreen) {
setTimeout(() => {
splashScreen.hide();
}, 500);
  }
        });
          
          console.log(_auth.authenticated);
          
          if(_auth.authenticated){
            this.navCtrl.setRoot(TabsPage);
          }

          this.loginData={email:"",password:""};
          this.registerData={email:"",password:"",password2:""};
            

 storage.get('email').then((val) => {
         this.loginData.email=val;
       })
        storage.get('password').then((val) => {
         this.loginData.password=val;
       })
          
  }

  page(){
    this.registerPage = !this.registerPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }


signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  signInWithGoogle(): void{
    this._auth.signInWithGoogle()
    .then(()=> this.onSignInSuccess());
  }

  signIn(): void {
    this._auth.signIn(this.loginData.email,this.loginData.password)
      .then(x => {
          this.storage.set('email', this.loginData.email);
          this.storage.set('password', this.loginData.password);

      })
      .catch((error) => {
    console.log(error);
      alert("Email Address or Password Incorrect");
    
    });
  }

  register(): void {
 
    this._auth.registerUser(this.registerData.email, this.registerData.password, this.registerData.password2)
    .then(x => {
          this.storage.set('email', this.registerData.email);
          this.storage.set('password', this.registerData.password);

      })
  .catch((error) => {
    console.log(error);
      alert("Email Address not valid or already in use");
    
      });
 }
 
 forgotPassword(): void {
   this._auth.forgotPassword(this.loginData.email)
   .catch( (error) => {
      alert(error.message);
    })
 }

  private onSignInSuccess(): void {
this.navCtrl.setRoot(TabsPage);
  }
  


}
