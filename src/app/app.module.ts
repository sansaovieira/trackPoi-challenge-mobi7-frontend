import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // <-- ADICIONADO FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPageComponent } from './pages/dashboard/dashboard.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { DwellTableComponent } from './shared/dwell-table/dwell-table.component';
import { MapViewComponent } from './shared/components/map-view/map-view.component';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    FiltersComponent,
    DwellTableComponent,
    MapViewComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
