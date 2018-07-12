import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenTicketPage } from './open-ticket';

@NgModule({
  declarations: [
    OpenTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenTicketPage),
  ],
})
export class OpenTicketPageModule {}
