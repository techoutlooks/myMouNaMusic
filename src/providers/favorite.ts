import { Injectable,Input } from '@angular/core';
import { AudioProvider } from '../app/shared/audio/ionic-audio-providers';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable ,FirebaseApp,FirebaseAuthState} from 'angularfire2';
import * as firebase from 'firebase';
import {AuthService}from './auth-service'
import  'rxjs/add/operator/take'

/*
  Generated class for the Favorite provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Favorite {
favorites:FirebaseListObservable<any>;
fav:any[]=[];
uid:any;
  constructor(public toast: ToastController,public af:AngularFire,public auth:AuthService) {
this.uid=this.auth.authState.uid;
this.favorites=this.af.database.list('favorites/'+this.uid)
this.favorites.subscribe(fav=>{
 this.fav=[];
 fav.forEach(element => {

   this.fav.push(element.$key)
 });
})

  }

  


  isFav(track){
//console.log(this.fav);



   if(this.fav.indexOf(track)>-1){
     return true;

   }
   else{
     return false;
   }


  }


  favorite(track){
    console.log(track);
    if(this.isFav(track)){

    }
    else{
    this.af.database.list('favorites/'+this.uid+"/"+track).push(true);
  
}
  }

  unFavorite(track){
    this.favorites.remove(track)
   
  }

}
