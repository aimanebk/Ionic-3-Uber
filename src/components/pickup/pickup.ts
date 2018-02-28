import { Component, Input, OnChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { PickupPubSubService } from '../../providers/pickup-pub-sub/pickup-pub-sub';
import { Observable } from 'rxjs/Observable';

declare var google : any;


@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnInit, OnChanges {
  @Input() isPinSet :boolean ;
  @Input() map  ;
  @Input() isPickupRequested;
  @Input() destination;
  @Output() updatedPickupLocation : EventEmitter<any> = new EventEmitter();

  private pickupMarker;
  private popup;
  private pickupSubscription;

  constructor(private pickupPubSubService : PickupPubSubService) {
    console.log('Hello PickupComponent Component');
  }

  ngOnInit(){
    this.pickupSubscription = this.pickupPubSubService.watch().subscribe(e=>{
      if(e.event === this.pickupPubSubService.EVENTS.ARRIVAL_TIME){
        this.updateTime(e.data);
      }
    })
  }

  ngOnChanges(changes){
    
    //do not allow pickup pin/location
    //to change if pickup is requested

    if(!this.isPickupRequested){
      if(this.isPinSet){
        this.showPickupMarker();
      }
      else{
        this.hidePickupMarker();
      }
    }

    if(this.destination){

      this.hidePickupMarker();
    }

  }

  showPickupMarker(){

    this.hidePickupMarker();

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

  updateTime(seconds){
    let minutes = Math.floor(seconds/60);
    this.popup.setContent(`<h5>${minutes} minutes</h5>`);
  }
}
