import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx'
import { SimulateService } from '../simulate/simulate';
 

@Injectable()
export class CarService {

  constructor(public simulateService : SimulateService) {
    console.log('Hello CarProvider Provider');
  }


  getCars(lat, lng){
    return Observable
    .interval(2000)
    .switchMap(() =>  this.simulateService.getCars(lat, lng))
    .share();
  }

  findPickupCar(pickupLocation){
    return this.simulateService.findPickupCar(pickupLocation);
  }
}
