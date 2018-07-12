import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: any;
  public password: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    public googlePlus: GooglePlus,
    public facebook: Facebook,
    public angularFireAuth: AngularFireAuth
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sendEmailVerification(): void {
    this.angularFireAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          console.log('email sent')
        })
      });
  };

  toastSuccessfulLogin() {
    let toast = this.toastCtrl.create({
      message: 'Successfully Logged In',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  toastFailedLogin() {
    let toast = this.toastCtrl.create({
      message: 'Login failed. Please check user handles and try again',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  toastEmailSent() {
    let toast = this.toastCtrl.create({
      message: 'Check inbox for confirmation email',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  signInWithGoogle() {
    this.googlePlus.login({
      'webClientId': '37639046366-pol88ucihq56c0pbdn5d0tqimg0ujr3e.apps.googleusercontent.com',
      'offline': true
    }).then(result => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
        .then(success => { this.toastSuccessfulLogin(); this.navCtrl.popToRoot(); })
        .catch(error => { this.toastFailedLogin(); this.navCtrl.popToRoot();})
    }).catch(error => {
      alert(`FAILED: ${error}`);
      this.navCtrl.popToRoot();
    });
  }//End method

  signInWithFacebook() {
    this.facebook.login(['email']).then(result => {
      const FACEBOOK_CONNECTION = firebase.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
      firebase.auth().signInWithCredential(FACEBOOK_CONNECTION)
        .then(success => { this.toastSuccessfulLogin(); this.navCtrl.popToRoot(); })
        .catch(error => { this.toastFailedLogin(); this.navCtrl.popToRoot(); })
    }).catch(error => {
      alert(JSON.stringify(error));
      this.navCtrl.popToRoot();
    });
  }//End method

  signInWithEmail(email, password) {
   this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      if(userCredential.user.emailVerified) {this.toastSuccessfulLogin(); this.navCtrl.popToRoot(); }
      else {this.toastFailedLogin(); this.navCtrl.popToRoot(); }
    })
    .catch(err => {
      alert(JSON.stringify(err));
      this.navCtrl.popToRoot();
    });
   }//End method

   registerWithEmail(email, password) {
     this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((res) => {
       this.sendEmailVerification();
       this.toastEmailSent();
     })
     .catch((err)=> {
       //Do as you please here
       this.toastFailedLogin();
     });
   }//End method
}
