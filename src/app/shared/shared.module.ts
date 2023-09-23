import { NgModule, ModuleWithProviders } from '@angular/core';
import { MusicService } from '../../providers/musicservice';
import { Favorite } from '../../providers/favorite';
import { MusicData } from '../../providers/music-data';
import { MusicControls } from '@ionic-native/music-controls';


@NgModule({})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [MusicService,Favorite,MusicData,MusicControls]
    };
  }
}


