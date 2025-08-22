import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { DwellTableComponent } from './shared/dwell-table/dwell-table.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    FiltersComponent,
    DwellTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
