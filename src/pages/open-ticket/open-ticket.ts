import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the OpenTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-ticket',
  templateUrl: 'open-ticket.html',
})
export class OpenTicketPage {

  public config: any;
  public eid: string;
  public oid: string;
  public rcid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularFireDatabase: AngularFireDatabase,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenTicketPage');
  }

  toastTicketSubmitted(): void {
    let toast = this.toastCtrl.create({
      message: 'Ticket submitted',
      position: 'top',
      duration: 1000
    });
    toast.present();
  }

  openTicket(): void {
    this.angularFireDatabase.object('/Orders').update({
      employee: this.eid,
      order: this.oid,
      revenue_center: this.rcid
    });
    this.toastTicketSubmitted();
  }
}
