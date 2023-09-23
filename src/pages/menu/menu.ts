import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController , Platform} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { MusicService } from '../../providers/musicservice';
import {TranslateService} from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { About } from '../about/about'

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {
  tabBarElement:any;


  constructor(public storage: Storage,public platform: Platform, public actionSheetCtrl: ActionSheetController, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams,public _auth:AuthService,public musicservice : MusicService) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
this.tabBarElement.style.display = 'none';


platform.ready().then(() => {
       platform.registerBackButtonAction(() => {
            if(this.navCtrl.canGoBack()){
              this.navCtrl.pop();
            }
           
          });
    });

 }

setLang(lang) {
this.translate.use(lang);
        this.translate.setDefaultLang(lang);


  this.storage.set('lang', lang);
}


langs() {
   let actionSheet = this.actionSheetCtrl.create({
     
     buttons: [
      
      {
         text: 'English',
         handler: () => {
this.setLang('en');         }
       },
       {
         text: 'كوردی',
         handler: () => {
this.setLang('krs');         }
       },
           {
         text: 'Kurdi',
         handler: () => {
this.setLang('krl');       
  }
       },
       {
         text: 'العربية',
         handler: () => {
this.setLang('ar');         }
       },
   
    
     ]
   });

   actionSheet.present();
 }








  ionViewDidLoad() {
    console.log('ionViewDidLoad Menu');
  }

     ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';}


     ionViewWillEnter() {
     this.tabBarElement.style.display = 'none';}

  logout(){

  this.musicservice.stop();
  this._auth.signOut();
  
}





followfb() {
  window.open('https://m.facebook.com/awazamusic','_system');
}

followig() {
  window.open('https://www.instagram.com/awazamusic','_system');
}

contact() {

window.open(`mailto:info@awaza.net`, '_system');
}

about() {
this.navCtrl.push(About);
}
}
