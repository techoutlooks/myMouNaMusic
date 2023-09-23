import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform } from 'ionic-angular';
import{MusicService} from '../../providers/musicservice';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import {Album} from '../album/album';
import {Artist} from '../artist/artist';
import {Share} from '../share/share';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BackgroundMode } from '@ionic-native/background-mode';



@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})

export class Player {

  tracks:any;
  playlist:boolean;
  tabBarElement:any;
  constructor(public bg:BackgroundMode,public platform: Platform, public share: SocialSharing ,public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams,public musicservice:MusicService) {
           
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
        this.tracks=this.musicservice.audio.tracks[0];
       
       this.playlist=false;

  }

shareTrack(){

this.navCtrl.push(Share,{
  title:this.tracks.title,
  art:this.tracks.art,
  artist:this.tracks.artist

})


}

gotoartist(){
  this.navCtrl.push(Artist,{'artistKey':this.tracks.artistId});
}



 gotoalbum(){
    this.navCtrl.push(Album,{
  
      albumKey:this.tracks.albumId,
    artistKey:this.tracks.artistId    })
  }

action() {
   let actionSheet = this.actionSheetCtrl.create({
     title: this.tracks.title,
     buttons: [
       {
         text: 'Go to Album',
         handler: () => {
this.gotoalbum();
         }
       },
       {
         text: 'Go to Artist',
         handler: () => {
           this.gotoartist();
         }
       },
       {
         text: 'Share',
         handler: () => {
   this.shareTrack();
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


  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
        this.playlist=false;

  }


  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the APIs
this.tracks=this.musicservice.audio.tracks[0];
    this.playlist=false;

   IntervalObservable.create(200).subscribe(n => {
        this.tracks=this.musicservice.audio.tracks[0];

    });

  }
 ionViewWillEnter() {
       this.tabBarElement.style.display = 'none';

    this.playlist=false;
            this.tracks=this.musicservice.audio.tracks[0];

    
  }




togglePlaylist(){
  this.playlist=!this.playlist;
}

 next(){
   if(this.musicservice.wait){
     console.log("waiting");
   }
   else{
     this.musicservice.next();
     this.tracks=this.musicservice.audio.tracks[0];

   }
 }

 prev(){
   if(this.musicservice.wait){
     console.log("waiting");
   }
   else{
     this.musicservice.prev();
     this.tracks=this.musicservice.audio.tracks[0];

   }
 }

 fav(){


 }

 more(){}


 play(track){
  this.musicservice.playnext(track);
  this.tracks=this.musicservice.audio.tracks[0];


}

 swipePlay(event){
   if(event.direction==2){
     this.musicservice.next();
     this.tracks=this.musicservice.audio.tracks[0];

   }
    if(event.direction==4){
     this.musicservice.prev();
     this.tracks=this.musicservice.audio.tracks[0];

   }
 }

}




