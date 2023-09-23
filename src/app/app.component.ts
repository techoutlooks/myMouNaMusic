import { Component, ViewChild} from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {  Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import {TranslateService} from '@ngx-translate/core';
import { BackgroundMode } from '@ionic-native/background-mode';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;
  public isLoggedIn: boolean;

  constructor(public storage: Storage,public bg: BackgroundMode, public translate: TranslateService, public afService: AuthService,public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,) {
        translate.setDefaultLang('en');

 storage.get('lang').then((val) => {
        translate.setDefaultLang(val);
       })
    this.afService.af.auth.subscribe(
      (auth) => {
        if(auth == null) {
          console.log("Not Logged in.");
          this.isLoggedIn = false;
          this.rootPage=Login;
        }
        else {
          console.log("Successfully Logged in.");
          // Set the Display Name and Email so we can attribute messages to them
          
          this.isLoggedIn = true;
          this.rootPage=TabsPage;
        }
      }
    );
    this.platform.ready().then(() => {
this.statusBar.overlaysWebView(true);
     this.statusBar.styleBlackTranslucent();
      this.statusBar.backgroundColorByHexString("#bd3f32");
       
            
        //this.splashScreen.hide();

    });
    

  }


  



}
