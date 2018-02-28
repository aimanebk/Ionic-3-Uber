import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car/car';
import * as SlidingMarker  from 'marker-animate-unobtrusive';
declare var google: any;

@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent implements OnInit, OnChanges{

  @Input() map;
  @Input() isPickupRequested ;
  @Input() pickupLocation;

  public pickupCarMarker ;
  public polylinePath;

  constructor(public carService : CarService) {
    console.log('Hello PickupCarComponent Component');
  }

  ngOnInit(){

  }

  ngOnChanges(){
    
    if(this.isPickupRequested){
      this.requestCar();
    }
    else{
      this.removeCar();
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

  requestCar(){
    console.log('request car '+this.pickupLocation);
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        //show car marker
        this.addCarMarker(car);
        //show car path/directions to you
        this.showDirections(car);
        //keep updating car
      })
  }

  removeCar(){

  }
}
