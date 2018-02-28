import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { MapsComponent } from '../components/maps/maps';
import { HomePage } from '../pages/home/home';
import { PickupComponent } from '../components/pickup/pickup';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { CarService } from '../providers/car/car';
import { SimulateService } from '../providers/simulate/simulate';
import { PickupCarComponent } from '../components/pickup-car/pickup-car';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarService,
    SimulateService
  ]
})
export class AppModule {}
