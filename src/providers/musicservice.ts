import {
  Injectable,
  Input
} from '@angular/core';
import {
  AudioProvider
} from '../app/shared/audio/ionic-audio-providers';
import {
  Subscription
} from 'rxjs/Subscription';
import {
  Observable
} from 'rxjs/Observable';
import {
  IntervalObservable
} from 'rxjs/observable/IntervalObservable';
import {
  Favorite
} from './favorite';
import {
  AuthService
} from './auth-service';
import {
  MusicData
} from './music-data';
import {
  MusicControls
} from '@ionic-native/music-controls';
import {
  AngularFire,
  FirebaseListObservable,
  FirebaseApp,
  FirebaseAuthState
} from 'angularfire2';
import * as firebase from 'firebase';

import {
  Platform
} from 'ionic-angular';

@Injectable()
export class MusicService {
  tracks: any;
  track: any;
  current: any;
  shuffle: boolean;
  repeat: number;
  subscription: Subscription;
  public internalVal = null;
  wait: boolean;
  time: any;
  duration: any;
  progress: any;
  ptime: any;
  playingTrack:any;


  constructor(public platform: Platform, public auth: AuthService, public af: AngularFire, public audio: AudioProvider, public fav: Favorite, public musicControls: MusicControls, public md: MusicData) {
    this.wait = false;
    this.shuffle = false;
    this.repeat = 0;
    this.playingTrack={key: 0};

   

  }



  music(track) {

    //this.musicControls.destroy();
    this.musicControls.create({
      track: track.title, // optional, default : ''
      artist: track.artist, // optional, default : ''
      cover: track.art, // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true, // optional, default : true
      dismissable: true, // optional, default : false

      // hide previous/next/close buttons:
      hasPrev: true, // show previous button, optional, default: true
      hasNext: true, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false

      // iOS only, optional
      album: track.albumName, // optional, default: ''
      duration: this.audio.tracks[this.audio.current].duration, // optional, default: 0
      elapsed: this.audio.tracks[this.audio.current].progress, // optional, default: 0

      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker: 'Now playing ' + track.name
    });





    this.musicControls.subscribe().subscribe(action => {

      switch (action) {
        case 'music-controls-next':
          this.next();
          break;
        case 'music-controls-previous':
          this.prev();
          break;
        case 'music-controls-pause':
          this.pause();
          this.musicControls.updateIsPlaying(false);
          this.musicControls.updateDismissable(true);
          break;
        case 'music-controls-play':
          this.audio.play(0);
          this.musicControls.updateIsPlaying(true);
          this.musicControls.updateDismissable(false);

          break;
        case 'music-controls-destroy':
          this.musicControls.destroy();
          this.stop();
          break;

          // Headset events (Android only)
        case 'music-controls-media-button':
          // Do something
          break;
        case 'music-controls-headset-unplugged':
          this.pause();
          this.musicControls.updateIsPlaying(false);
          this.musicControls.updateDismissable(true);
          break;
        case 'music-controls-headset-plugged':
          this.audio.play(0);
          this.musicControls.updateIsPlaying(true);
          this.musicControls.updateDismissable(false);
          break;



        case 'music-controls-media-button-next':
          this.next();
          break;

        case 'music-controls-media-button-pause':
          this.pause();
          this.musicControls.updateIsPlaying(false);
          this.musicControls.updateDismissable(true);
          break;

        case 'music-controls-media-button-play':
          this.audio.play(0);
          this.musicControls.updateIsPlaying(true);
          this.musicControls.updateDismissable(false);
          break;

        case 'music-controls-media-button-play-pause':
          this.audio.play(0);
          this.musicControls.updateIsPlaying(true);
          this.musicControls.updateDismissable(false);
          break



        case 'music-controls-media-button-previous':
          this.prev();
          break;

        case 'music-controls-media-button-stop':
          this.stop();
          break;

        case 'music-controls-media-button-fast-forward':
          this.seekTo();
          break;

        case 'music-controls-media-button-rewind':
          this.seekBack();
          break;

        case 'music-controls-media-button-skip-backward':
          this.seekBack();
          break;

        case 'music-controls-media-button-skip-forward':
          this.seekTo();
          break;

        case 'music-controls-media-button-step-backward':
          this.seekBack();
          break;

        case 'music-controls-media-button-step-forward':
          this.seekTo();
          break;

        case 'music-controls-media-button-meta-left':

          break;

        case 'music-controls-media-button-meta-right':

          break;

        case 'music-controls-media-button-music':
          this.audio.play(0);
          this.musicControls.updateIsPlaying(true);
          this.musicControls.updateDismissable(false);
          break;

        case 'music-controls-media-button-volume-up':

          break;

        case 'music-controls-media-button-volume-down':

          break;

        case 'music-controls-media-button-volume-mute':

          break;

        case 'music-controls-media-button-headset-hook':
          this.pause();
          this.musicControls.updateIsPlaying(false);
          this.musicControls.updateDismissable(true);
          break;



        default:
          this.audio.play(0);
          break;

      }








    });






    this.musicControls.listen(); // activates the observable above



  }














  isFav() {
    return this.fav.isFav(this.tracks[this.current].key);
  }



  favorite() {
    this.fav.favorite(this.tracks[this.current].key);

  }

  unFavorite() {
    this.fav.unFavorite(this.tracks[this.current].key);
  }


  seekTo() {
    let seek = this.audio.tracks[0].progress + 5;
    this.audio.seekTo(seek);
  }

  seekBack() {
    let seek = this.audio.tracks[0].progress - 5;
    this.audio.seekTo(seek);
  }




  toggleShuffle() {
    this.shuffle = !this.shuffle;
  }


  toggleRepeat() {

    switch (this.repeat) {

      case 0:
        this.repeat = 1;
        break;

      case 1:
        this.repeat = 2;
        break;

      case 2:
        this.repeat = 0;
        break;

    }

  }




  uploadAnalytics(track) {


    this.af.database.list("popularTrack/" + track.key + "/played").push({
      uid: this.auth.auth$.getAuth().uid,
      timespan: Date.now()
    });
    this.af.database.list("popularArtist/" + track.artistId + "/played").push({
      uid: this.auth.auth$.getAuth().uid,
      timespan: Date.now()
    });
    this.af.database.list("popularAlbum/" + track.albumId + "/played").push({
      uid: this.auth.auth$.getAuth().uid,
      timespan: Date.now()
    });


  }

  

  play(tracks, track) {
    console.log(this.wait);
    if (!this.wait) {
      this.wait = true;
       IntervalObservable.create(200).subscribe(n => {


      if (this.audio.tracks[0].isLoading == false) {
        this.wait = false;
      } else {
        this.wait = true;
      }
        if (this.audio.tracks[0].isFinished) {
          this.finish()
        }
        if (this.audio.tracks[0].error) {
          //this.playingTrack(0);
        }
      
    });

this.playingTrack = tracks[track];
      if (this.audio.current != undefined) {
        this.audio.pause();
        this.audio.seekTo(0);
      }
      this.tracks = tracks;
      this.current = track;
      this.audio.current = 0;
      this.audio.eraseTracks();
      this.audio.create(this.tracks[track]);
      this.audio.play(0);
      if (this.platform.is('cordova')) {
        this.music(tracks[track]);
        this.musicControls.updateIsPlaying(true);
      }
      this.uploadAnalytics(tracks[track]);

    }
  }





  playnext(track) {

    if (!this.wait) {

      this.wait = true;

      if (this.audio.current != undefined) {
        this.audio.pause();
        this.audio.seekTo(0);
      }
      this.playingTrack = this.tracks[track];

      this.current = track;
      this.audio.eraseTracks();
      this.audio.current = 0;
      this.audio.create(this.tracks[track]);
      this.audio.play(0);
      if (this.platform.is('cordova')) {
        this.music(this.tracks[track]);
      }
      this.uploadAnalytics(this.tracks[track]);
    }
  }




  pause() {
    if (this.audio.current != undefined) {
      this.audio.pause();
      this.musicControls.updateIsPlaying(false);
    }
  }

  stop() {
    if (this.audio.current != undefined) {
      this.audio.seekTo(0);
      this.audio.pause();
      this.musicControls.updateIsPlaying(false);

    }

  }






  next() {

    if (this.audio.current != undefined && !this.wait) {

      if (this.shuffle && this.tracks.length != 1) {

        while (true) {
          let t = Math.floor((Math.random() * (this.tracks.length)) + 0);
          if (t != this.current) {
            this.playnext(t);
            break;
          }



        }


      } else {



        if (this.current < this.tracks.length - 1) {
          this.playnext(this.current + 1);
        } else {
          this.playnext(0);
        }



      }


    }
  }





  prev() {
    if (this.audio.current != undefined != undefined && !this.wait) {

      if (this.shuffle) {
        while (true) {
          let t = Math.floor((Math.random() * (this.tracks.length)) + 0);
          if (t != this.current) {
            this.playnext(t);
            break;
          }
        }
      } else {



        if (this.current > 0) {
          this.playnext(this.current - 1);
        } else {
          this.playnext(this.tracks.length - 1);
        }



      }


    }
  }




  finish() {
    if (this.audio.current != undefined) {

      if (this.repeat != 2) {

        if (this.shuffle) {
          while (true) {
            let t = Math.floor((Math.random() * (this.tracks.length)) + 0);
            if (t != this.current) {
              this.playnext(t);
              break;
            }
          }
        } else {



          if (this.current < this.tracks.length - 1) {
            this.playnext(this.current + 1);
          } else {
            if (this.repeat == 1) {
              this.playnext(0);
            } else if (this.repeat == 0) {
              //this.stop();
              if (this.platform.is('cordova')) {
                this.musicControls.updateIsPlaying(false);
              }
            } else {
              this.playnext(this.current);

            }
          }



        }




      } else {
        this.playnext(this.current);
      }


    }
  }















}
