import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

declare var google : any;


@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnChanges {
  @Input() isPinSet :boolean ;
  @Input() map  ;
  @Output() updatedPickupLocation : EventEmitter<any> = new EventEmitter();

  private pickupMarker;
  private popup;

  constructor() {
    console.log('Hello PickupComponent Component');
  }

  ngOnChanges(changes){

    if(this.isPinSet){
      this.showPickupMarker();
    }
    else{
      this.hidePickupMarker();
    }
  }

  showPickupMarker(){

    this.pickupMarker =  new google.maps.Marker({
      map : this.map,
      animation : google.maps.Animation.BOUNCE,
      position : this.map.getCenter(),
      icon : 'assets/imgs/pin.png'
    })

    setTimeout(() => {
      this.pickupMarker.setAnimation(null)
    }, 750);

    this.showPickupTime();

    //send pickup location
    this.updatedPickupLocation.next(this.pickupMarker.getPosition());
  }

  hidePickupMarker(){

    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
    }

  }

  showPickupTime(){
    this.popup = new google.maps.InfoWindow({
      content : '<h5>You Are Here</h5>'
    });
    this.popup.open(this.map, this.pickupMarker);

    google.maps.event.addListener(this.pickupMarker, 'click', () =>{
      this.popup.open(this.map, this.pickupMarker);
    });
  }
}
