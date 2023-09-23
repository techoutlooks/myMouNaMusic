import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable ,FirebaseApp,FirebaseAuthState} from 'angularfire2';
import * as firebase from 'firebase';
import {AuthService}from './auth-service'
import  'rxjs/add/operator/take'
@Injectable()
export class MusicData {

artists:FirebaseListObservable<any>;
albums:FirebaseListObservable<any>;
tracks:FirebaseListObservable<any>;
playlists:FirebaseListObservable<any>;
userPlaylists:FirebaseListObservable<any>;
moods:FirebaseListObservable<any>;
newArtists:FirebaseListObservable<any>;
newAlbums:FirebaseListObservable<any>;
newTracks:FirebaseListObservable<any>;
newPlaylists:FirebaseListObservable<any>;
favorite:FirebaseListObservable<any>;
popularTrack:FirebaseListObservable<any>;
popularArtist:FirebaseListObservable<any>;
popularAlbum:FirebaseListObservable<any>;
user:any;
popularTracks:any

  constructor(public af:AngularFire,private _auth: AuthService) {

this.user=this._auth.auth$.getAuth().uid;


this.popularArtist=this.af.database.list('/popularArtist',{query:{
  orderByChild:"count",
  limitToFirst:50
}});


this.popularAlbum=this.af.database.list('/popularAlbum',{query:{
  orderByChild:"count",
  limitToFirst:50
}})





this.popularTrack=this.af.database.list('/popularTrack',{query:{
  orderByChild:"count",
  limitToFirst:50
}})

this.popularArtist.take(1);
this.popularAlbum.take(1);
this.popularTrack.take(1);


this.artists=this.af.database.list('/artists')


this.newArtists=this.af.database.list('/artists',{
  query:{
    orderByChild:"timestamp",
    limitToLast:50
  }
}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;


this.albums=this.af.database.list('/albums')
this.newAlbums=this.af.database.list('/albums',{
  query:{
    orderByChild:"timestamp",
    limitToLast:50
  }
}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;


this.tracks=this.af.database.list('/tracks')
this.newTracks=this.af.database.list('/tracks',{
  query:{
    orderByChild:"chosen",
    equalTo:true,
    
    limitToLast:50
  }
}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;


this.playlists=this.af.database.list('/playlists')
this.favorite=this.af.database.list('/favorite/'+this.user);

  }

}
