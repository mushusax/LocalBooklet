import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { OpenTicketPage } from '../open-ticket/open-ticket';
import { SearchPage } from '../search/search';
import { LogsPage } from '../logs/logs';

// import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public googlePlus: GooglePlus) {
    }

  toastSuccessfulLogOut() {
    let toast = this.toastCtrl.create({
      message: 'Successfully logged out.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  toastFailedLogOut(error: any) {
    let toast = this.toastCtrl.create({
      message: `Failed to log out.\n${error}`,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  toastUserAuthState() {
    let user = firebase.auth().currentUser;
    let properties = {
      message: '',
      duration: 2000,
      position: 'top'
    };

    //Check user auth state
    if(user) {
      properties.message = 'User is signed in.';
    } else {
      properties.message = 'User is not signed in.';
    }

    let toast = this.toastCtrl.create(properties);
    toast.present();
  }

  toastMustLoginFirst() {
    let toast = this.toastCtrl.create({
      message: 'Please login to view this page',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  toastAlreadyLoggedIn() {
    let toast = this.toastCtrl.create({
      message: 'Already logged in. Log out before switching accounts.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  public isLoggedIn(): boolean {
    let user = firebase.auth().currentUser;
    if(user) return true;
    else return false;
  }

  public onClickLoginPage(): void {
    if(!this.isLoggedIn())
      this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
    else
      this.toastAlreadyLoggedIn();
  }

  public onClickOpenTicketPage(): void {
    if(this.isLoggedIn())
      this.navCtrl.push(OpenTicketPage, {}, {animate: true, direction: 'forward'});
    else
      this.toastMustLoginFirst();
  }

  public onClickSearchPage(): void {
    if(this.isLoggedIn())
      this.navCtrl.push(SearchPage, {}, {animate: true, direction: 'forward'});
    else
      this.toastMustLoginFirst();
  }

  public onClickLogsPage(): void {
    if(this.isLoggedIn())
      this.navCtrl.push(LogsPage, {}, {animate: true, direction: 'forward'});
    else
      this.toastMustLoginFirst();
  }

  public onClickLogOut(): void {
    //Firebase logout
    firebase.auth().signOut().then( () => {
      this.toastSuccessfulLogOut();
    }).catch((error) => {
      this.toastFailedLogOut(error);
    });

    //Google logout
    this.googlePlus.logout().then((message) => {
      console.log('Google Plus logout', message);
    }).catch((error) => {
      console.log('Google Plus logout', error);
    })
  }
}
