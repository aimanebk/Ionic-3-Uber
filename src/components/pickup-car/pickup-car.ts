import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car/car';
import * as SlidingMarker  from 'marker-animate-unobtrusive';
import { PickupPubSubService } from '../../providers/pickup-pub-sub/pickup-pub-sub';
declare var google: any;

@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent implements OnInit, OnChanges{

  @Input() map;
  @Input() isPickupRequested ;
  @Input() pickupLocation;
  @Input() destination

  public pickupCarMarker ;
  public polylinePath;
  public cab;

  constructor(public carService : CarService,
              private pickupPubSub : PickupPubSubService) {
    console.log('Hello PickupCarComponent Component');
  }

  ngOnInit(){

  }

  ngOnChanges(){

    if(this.destination){
      this.dropoffCar();
    }
    else{
      if(this.isPickupRequested){
        this.requestCar();
      }
      else{
        this.removeCar();
        this.removeDirections();
      }
    }
  }

  addCarMarker(car){
    this.pickupCarMarker = new SlidingMarker({
      map:this.map,
      position :car.position,
      icon : 'assets/imgs/taxi.png'
    })

    this.pickupCarMarker.setDuration(1000);
    this.pickupCarMarker.setEasing('linear');
  }

  showDirections(car){
    this.polylinePath = new google.maps.Polyline({
      path:car.path,
      strokeColor: '#FF0000',
      strokeWeight : 3
    })

    this.polylinePath.setMap(this.map);
  }

  updateCar(cbDone){

    this.carService.getPickupCar().subscribe( car =>{
      this.cab = car;
     
      if(this.destination || this.pickupCarMarker){
         //animate car to next point
        this.pickupCarMarker.setPosition(this.cab.position);
        // set direction path for car 
        this.polylinePath.setPath(this.cab.path);
        //update arrival time
        this.pickupPubSub.emitArrivalTime(this.cab.time);
    }
      //keep updating car 
      if (this.cab.path.length > 1 ){
        setTimeout(() => {
          this.updateCar(cbDone);
        }, 1000);
      }
      else {
        //car arrived
        cbDone();
      }
    });
  }

  checkForRiderPickup(){
    this.carService.pollForRiderPickup().subscribe(data =>{
      this.pickupPubSub.emitPickUp();
    })
  }

  checkForRiderDropOff(){
    this.carService.pollForRiderDropOff().subscribe(data =>{
      this.pickupPubSub.emitDropOff();
    })
  }

  requestCar(){
    console.log('request car '+this.pickupLocation);
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        //show car marker
        this.addCarMarker(car);
        //show car path/directions to you
        this.showDirections(car);
        //keep updating car
        this.updateCar(() => this.checkForRiderPickup());
      })
  }

  dropoffCar(){
    this.carService.dropoffCar(this.pickupLocation , this.destination)
      .subscribe(car => {
        //keep updating car
        this.updateCar(() => this.checkForRiderDropOff());
      })
  }

  removeDirections(){

    if(this.polylinePath){
      this.polylinePath.setMap(null);
      this.polylinePath = null;
    }
  }

  removeCar(){

    if(this.pickupCarMarker) {
      this.pickupCarMarker.setMap(null);
      this.pickupCarMarker = null;
    }

  }
}
