import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BackgroundMode } from '@ionic-native/background-mode';



@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class Share {
title:any;
art:string;
subtitle:any;
link:any;
  tabBarElement:any;
  text:string;
  artist:any;
  sms:string;

  constructor(public bg:BackgroundMode,public platform: Platform, public sh: SocialSharing , public navParams: NavParams,public navCtrl:NavController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
this.tabBarElement.style.display = 'none';
    this.title=this.navParams.get("title");
    this.artist=this.navParams.get("artist");
    this.art = this.navParams.get("art");
    this.link="http://play.google.com/com.fastwares.awaza";
    this.text="#NowPlaying " + this.title + " by " + this.artist + " #Awaza "+ ' ' + this.art;
    this.sms="#NowPlaying " + this.title + " by " + this.artist + " #Awaza";

    
platform.ready().then(() => {
       platform.registerBackButtonAction(() => {
            if(this.navCtrl.canGoBack()){
              this.navCtrl.pop();
            }else{
              this.bg.moveToBackground();
            }
           
          });
    });

  }







  ionViewDidLoad() {

  }

    ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';}


     ionViewWillEnter() {
     this.tabBarElement.style.display = 'none';}
  
  share(){
      this.sh.share(this.text ,' ', '',this.link)
         .then((data) =>
         {
            console.log('Shared via SharePicker');
         })
         .catch((err) =>
         {
            console.log('Was not shared via SharePicker');
         });
  }


  sharefb(art){
    this.sh.shareViaFacebook(this.text,null,this.link);
  }

  shareig(art){
    this.sh.shareViaInstagram(this.text,null);
  }

  sharewa(art){
    this.sh.shareViaWhatsApp(this.text,null);
  }

  sharesms(){
    this.sh.shareViaSMS(this.text,"");
  }

  shareem(){
    this.sh.shareViaEmail(this.text,'Awaza',null,null,null,null);
  }

}
