import { NgModule } from '@angular/core';
import { MapsComponent } from './maps/maps';
import { PickupComponent } from './pickup/pickup';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { PickupCarComponent } from './pickup-car/pickup-car';
@NgModule({
	declarations: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent],
	imports: [],
	exports: [MapsComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent]
})
export class ComponentsModule {}
