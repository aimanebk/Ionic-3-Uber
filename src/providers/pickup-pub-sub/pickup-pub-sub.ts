import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';


@Injectable()
export class PickupPubSubService {

  public pickup$ ;
  private _observer;

  public EVENTS = {
    PICKUP : 'pickup',
    DROPOFF : 'dropoff',
    ARRIVAL_TIME : 'arrival-time'
  }

  constructor() {
    console.log('Hello PickupPubSubProvider Provider');
    this.pickup$ = new Observable(observer => {
      this._observer = observer;
    })
    .share(); //share() allows multiple subscribers
  }

  watch(){
    return this.pickup$
  }

  emitArrivalTime(time){
    this._observer.next({
      event : this.EVENTS.ARRIVAL_TIME,
      data : time
    })
  }

  emitPickUp(){
    this._observer.next({
      event : this.EVENTS.PICKUP,
      data : null
    })
  }
  emitDropOff(){
    this._observer.next({
      event : this.EVENTS.DROPOFF,
      data : null
    })
  }


}
