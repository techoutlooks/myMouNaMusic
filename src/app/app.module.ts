import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { Player } from '../pages/player/player';
import {Share} from '../pages/share/share';
import {About} from '../pages/about/about';
import {Menu} from '../pages/menu/menu';
import { InAppBrowser } from '@ionic-native/in-app-browser';


import { SearchPage } from '../pages/search/search';
import { LibraryPage } from '../pages/library/library';
import { HomePage } from '../pages/home/home';
import { MoodsPage } from '../pages/moods/moods';
import { Mood } from '../pages/mood/mood';
import { Artist } from '../pages/artist/artist';
import { Album } from '../pages/album/album';


import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { SharedModule } from './shared/shared.module';
import {IonicAudioModule} from './shared/audio/ionic-audio.module'
import { AuthService } from '../providers/auth-service';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Http, HttpModule} from '@angular/http';

import { Login } from '../pages/login/login';

// Import the AF2 Module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
 
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BackgroundMode } from '@ionic-native/background-mode';
import { Keyboard } from '@ionic-native/keyboard';

import { IonicStorageModule } from '@ionic/storage';


// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyD70l8eAE8lEOw4ggZElSLbgoykOCF6BeM",
    authDomain: "awaza-47e7f.firebaseapp.com",
    databaseURL: "https://awaza-47e7f.firebaseio.com",
    projectId: "awaza-47e7f",
    storageBucket: "awaza-47e7f.appspot.com",
    messagingSenderId: "739916983861"
};

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
  declarations: [

    MyApp,
    SearchPage,
    Player,
    About,
    LibraryPage,
    MoodsPage,
    Mood,
    HomePage,
    TabsPage,
    Artist,
    Album,
    Login,
    Share,
    Menu,
 
  ],
  imports: [
    HttpModule,
    IonicStorageModule.forRoot(),
TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
        SharedModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      iconMode: 'ios',
      
      
    }),
    IonicAudioModule.forRoot(), 
    AngularFireModule.initializeApp(firebaseConfig)


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    LibraryPage,
    HomePage,
    MoodsPage,
    Mood,
    About,
    Player,
    Artist,
    Album,
    TabsPage,
    Login,
    Share,
    Menu,
  ],
  providers: [
    BackgroundMode,
    InAppBrowser,
    AuthService,
    Keyboard,
    Facebook,
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
