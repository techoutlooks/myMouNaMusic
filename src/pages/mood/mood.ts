import { Component,Inject } from '@angular/core';
import { NavController,NavParams, ActionSheetController,Platform } from 'ionic-angular';
import{MusicService} from '../../providers/musicservice';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import{Player} from '../player/player';
import {AngularFire, FirebaseListObservable ,FirebaseApp} from 'angularfire2';
import * as firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import{Favorite} from '../../providers/favorite';
import {Artist} from '../artist/artist';
import {Album} from '../album/album';
import {Share} from '../share/share';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BackgroundMode } from '@ionic-native/background-mode';



@Component({
  selector: 'page-mood',
  templateUrl: 'mood.html'
})



export class Mood {
  tracks:any;
  playlists:any[]=[];
  trackss:FirebaseListObservable<any>;
mood:any;
tabBarElement:any;
  constructor(public bg:BackgroundMode,public platform: Platform,public favorite: Favorite,public actionSheetCtrl: ActionSheetController, public params:NavParams,private _auth: AuthService,public navCtrl: NavController,public musicservice:MusicService,public af: AngularFire) 
  {

    platform.ready().then(() => {
       platform.registerBackButtonAction(() => {
            if(this.navCtrl.canGoBack()){
              this.navCtrl.pop();
            }else{
              this.bg.moveToBackground();
            }
           
          });
    });
  
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
this.tabBarElement.style.display = 'none';

            console.log(_auth.authenticated);

this.mood=this.params.get('mood');


af.database.list('/tracks/',{preserveSnapshot: true})
.subscribe(snapshots=>{

        snapshots.forEach(element => {
          if(element.val().mood == this.mood.key ||
          element.val().mood2 == this.mood.key ||
          element.val().mood3 == this.mood.key)
          {
          this.playlists.push( 

      {src: element.val().url,
      artist: element.val().artistName,
      title: element.val().name,
      art: element.val().albumArt,
      preload: 'metadata',
    key:element.key,
  artistId:element.val().artist,
albumId:element.val().album,
album:element.val().albumName }  

          );}
        });
          });
  


 



  

this.tracks=this.musicservice.audio.tracks[0];
  }











  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the APIs
this.tracks=this.musicservice.audio.tracks[0];

   IntervalObservable.create(200).subscribe(n => {
        this.tracks=this.musicservice.audio.tracks[0];

    });

  }

ionViewWillLeave() {
this.tabBarElement.style.display = 'flex';}

   ionViewWillEnter(){
            this.tabBarElement.style.display = 'none';

   this.tracks=this.musicservice.audio.tracks[0];

   }


play(track){
  this.musicservice.play(this.playlists,track);
this.tracks=this.musicservice.audio.tracks[0];

}

shuffle(){
  let t=Math.floor((Math.random() * (this.playlists.length)) + 0);
  this.musicservice.play(this.playlists,t);
this.tracks=this.musicservice.audio.tracks[0];
this.musicservice.shuffle=true;

}



next(){
  this.musicservice.next();
this.tracks=this.musicservice.audio.tracks[0];

}


finish(){
  this.musicservice.finish();
  console.log("finish method");
}

player(){
  this.navCtrl.push(Player);
}

 
 gotoartist(track){
  this.navCtrl.push(Artist,{'artistKey':track.artistId});
}



 gotoalbum(track){
    this.navCtrl.push(Album,{
  
      albumKey:track.albumId,
    artistKey:track.artistId    })
  }


more(track) {
   let actionSheet = this.actionSheetCtrl.create({
     title: track.name,
     buttons: [
      
      {
         text: 'Add to favorite',
         handler: () => {
           this.favorite.favorite(track.key)
         }
       },
       {
         text: 'Go to Artist',
         handler: () => {
           this.gotoartist(track);
         }
       },
       {
         text: 'Go to Album',
         handler: () => {
           this.gotoalbum(track);
         }
       },
       {
         text: 'Share',
         handler: () => {
   this.shareTrack(track);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }


shareTrack(track){

this.navCtrl.push(Share,{
  title:track.name,
  artist:track.artistName,
  art:track.albumArt

})


}



}
 
