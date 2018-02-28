import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular'
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable'
declare var google : any;

@Component({
  selector: 'maps',
  templateUrl: 'maps.html'
})
export class MapsComponent implements OnInit{

  @Input() isPickupRequested : boolean;
  @Input() destination;

  public map;
  public isMapIdle : boolean;
  public currentLocation;

  constructor(public geolocation : Geolocation,
              public loadingCtrl : LoadingController) {
    console.log('Hello MapsComponent Component');
  }

  ngOnInit(){
    this.map =this.createMap();
    this.addMapEventListeners();

    this.getCurrentLocation().subscribe(location => {
      this.map.setCenter(location);
    })
  }

  updatePickupLocation(location){
    this.currentLocation = location;
    this.centerLocation(location);
  }

  addMapEventListeners(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
  }


  getCurrentLocation() {

    let loading = this.loadingCtrl.create({
      content:'Locating...'
    });

    loading.present();

    let options = {timeout : 10000 , enableHighAccuracy:true};
    let locationObs = new Observable(observable => {
      this.geolocation.getCurrentPosition(options)
      .then(resp => {
        let lat = resp.coords.latitude;
        let lng = resp.coords.longitude;
        console.log('lat '+ lat +' == '+ 'long '+lng )
        let location = new google.maps.LatLng(lat, lng);
        console.log('current location '+location)
        observable.next(location);

        loading.dismiss();
      // },
      // (err) => {
      //   console.log('Geolocation err: '+ err);
      //   loading.dismiss();
      // })
      })
    })
    return locationObs;
  }


  createMap(location = new google.maps.LatLng(40.712784,-74.005942)){
    console.log('init location ' + location)
    let mapOptions = {
      center: location,
      zoom:15,
      mapTypeId:google.maps.MapTypeId.ROADMAP,
      disableDefaultUI:true
    }
    let mapEl = document.getElementById("map");
    let map = new google.maps.Map(mapEl,mapOptions);

    return map;
  }

  centerLocation(location){
    if(location){
      this.map.setCenter(location);
    }
    else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.setCenter(currentLocation);
      })
    }
  }
}
