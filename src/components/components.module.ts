import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { PickupComponent } from './pickup/pickup';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { DestinationAddresComponent } from './destination-addres/destination-addres';
@NgModule({
	declarations: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddresComponent],
	imports: [],
	exports: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddresComponent]
})
export class ComponentsModule {}
