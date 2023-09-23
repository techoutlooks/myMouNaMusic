import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LibraryPage } from '../library/library';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { MoodsPage } from '../moods/moods';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = LibraryPage;
  tab4Root = MoodsPage;

  constructor(platform: Platform, splashScreen: SplashScreen) {

  }
}
