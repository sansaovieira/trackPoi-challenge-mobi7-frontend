import { Component, Input, OnChanges } from '@angular/core';
import { Poi } from 'src/app/core/models/poi.model';
import { Position } from 'src/app/core/models/position.model';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnChanges {
  @Input() pois: Poi[] = [];
  @Input() positions: Position[] = [];

  mapUrl: string = '';

  ngOnChanges() {
    this.updateMap();
  }

  private updateMap() {
    if (!this.pois.length && !this.positions.length) {
      this.mapUrl = '';
      return;
    }

    const allCoords = [
      ...this.pois.map((p) => `${p.latitude},${p.longitude}`),
      ...this.positions.map((p) => `${p.latitude},${p.longitude}`),
    ];

    const center = allCoords[0];
    const markers = allCoords.map((c) => `&markers=${c}`).join('');

    this.mapUrl = `https://maps.google.com/maps?q=${center}&t=&z=12&ie=UTF8&iwloc=&output=embed${markers}`;
  }
}
