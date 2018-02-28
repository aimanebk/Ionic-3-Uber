import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsComponent } from '../../components/maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public isPickupRequested;
  
  constructor(public navCtrl: NavController) {
    this.isPickupRequested = false;
  }

  confirmPickup(){
    this.isPickupRequested = true;
  }

  cancelPickup(){
    this.isPickupRequested = false;
  }
}
