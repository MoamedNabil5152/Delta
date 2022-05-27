import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "src/shared/shared.module";
import { NgApexchartsModule } from 'ng-apexcharts';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SeatsComponent } from './static/seats/seats.component';
import { SeatsFormComponent } from './static/seats-form/seats-form.component';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
  declarations: [...AppRoutingModule.Components, SeatsComponent, SeatsFormComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule , NgApexchartsModule , CarouselModule ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
