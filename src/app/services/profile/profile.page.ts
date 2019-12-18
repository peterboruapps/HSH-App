import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, PickerController } from '@ionic/angular';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Validators, FormBuilder, FormGroup } from '@angular/forms';
//import { ImageProvider } from '../../providers/image/image';
//import { AppConstants } from '../../providers/constant/constant';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfileModalPage implements OnInit {
user_id: any = 1;
userinfo: any= {
  first_name: "Chuck",
  user_name: "admin",
  last_name: "Okere",
  email1: "cokere@boruapps.com",
  unavailable: "I'm on vacation January 1st to January 13th please don't book me during those times!"
  //theme: "Dark",
};
imageData: any;
modalTitle:string;
modelId:number;
serviceid: any;
apiurl:any;
updatefields: any;
profile_picture: any;
has_profile_picture: boolean = false;

constructor(
private modalController: ModalController,
public storage: Storage,
private  router:  Router,
private navParams: NavParams,
//public httpClient: HttpClient,
private pickerCtrl: PickerController,
//private formBuilder: FormBuilder,
public toastController: ToastController,
//public imgpov: ImageProvider,
//public appConst: AppConstants,
){
    //this.imageData = this.imgpov.getImage();
  //  this.apiurl = this.appConst.getApiUrl();
}

  ngOnInit() {
    this.userinfo.first_name = this.userinfo.firstname;
    this.userinfo.last_name = this.userinfo.lastname;
    this.userinfo.email1 = "cokere@boruapps.com";
    this.userinfo.user_name = "Chuck";
    this.userinfo.profile_picture = this.userinfo.pic;
    this.has_profile_picture = false;
    this.userinfo.unavailable = "I'm on vacation January 1st to January 13th please don't book me during those times!";
    /* this.user_id = this.navParams.data.user_id;
    this.userinfo = this.navParams.data.userinfo;
    this.profile_picture = this.navParams.data.userinfo.profile_picture;
    if(this.navParams.data.userinfo.imagename !== ""){
      this.has_profile_picture = true
    }else{
      this.has_profile_picture = false;
    }
    console.log('nav params', this.navParams.data.userinfo); */
  }
  
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  async  sendUpdates(){
    /*
      this.updatefields;
      var headers = new HttpHeaders();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
       this.httpClient.post(this.apiurl + "updateProfile.php", this.updatefields, { headers:headers, observe: 'response' })
          .subscribe(data => {
              //console.log(data['_body']);
              if(data['body']['success'] == true){
                this.presentToastPrimary('Profile updated \n');
                this.closeModal();
              }else{
                  console.log('update failed');
                  this.presentToast('Profile update failed! Please try again \n');
              }
          }, error => {
              //console.log(error);
              //console.log(error.message);
              //console.error(error.message);
              this.presentToast("Profile update failed! Please try again \n" + error.message);
          }); */
  }

    async presentToast(message: string) {
        var toast = await this.toastController.create({
            message: message,
            duration: 3500,
            position: "bottom",
            color: "danger"
        });
        toast.present();
    }

    async presentToastPrimary(message: string) {
        var toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: "bottom",
            color: "primary"
        });
        toast.present();
    }

    logout(){
        console.log('logout clicked');
        this.storage.set("userdata", null);
        this.closeModal();
        this.router.navigateByUrl('/login');
    }
    async getCurrentTheme(){
        var current_theme = this.storage.get('userdata').then((userdata) => {
          if(userdata && userdata.length !== 0){
            //current_theme = userdata.theme.toLowerCase();
            return userdata.theme.toLowerCase();
          }else{
            return false;
          }
        })
       return current_theme;
    }
    async updateCurrentTheme(theme: string){
        var userjson: object;
        await this.isLogged().then(result => {
          if (!(result == false)){
            userjson = result;
          }
        })
        //console.log('from set current theme', userjson.theme);
        userjson['theme'] = theme.charAt(0).toUpperCase() + theme.slice(1);
        //console.log('from set current theme', userjson);
        this.storage.set('userdata', userjson);
        this.userinfo.theme= theme.charAt(0).toUpperCase() + theme.slice(1);
        console.log('updated theme on storage memory');
      }
      async switchTheme(){
        var current_theme;
        await this.getCurrentTheme().then((theme) => {
          console.log("the current theme is", theme);
          current_theme = theme;
        });
        var theme_switcher = {
                              "dark": "light", 
                              "light": "dark"
        };
        var destination_theme = theme_switcher[current_theme]
        console.log('switching theme from:', current_theme);
        console.log('switching theme to:', destination_theme);
        document.body.classList.toggle(destination_theme, true);
        document.body.classList.toggle(current_theme, false);
        this.updateCurrentTheme(destination_theme);
        console.log('theme switched');
    }
    async isLogged(){
        var log_status = this.storage.get('userdata').then((userdata) => {
            if(userdata && userdata.length !== 0){
                return userdata;
            }else{
                return false;
            }
        })
        return log_status;
    }
    loadTheme(theme){
        console.log('loading theme', theme);
        document.body.classList.toggle(theme, true);
        var theme_switcher = {
            "dark": "light", 
            "light": "dark"
        };
        document.body.classList.toggle(theme_switcher[theme], false); //switch off previous theme if there was one and prefer the loaded theme.
        console.log('turning off previous theme', theme_switcher[theme]);
    }

}