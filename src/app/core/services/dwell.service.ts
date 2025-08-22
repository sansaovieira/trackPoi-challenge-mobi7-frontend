import { Injectable } from '@angular/core';
import { Position } from '../models/position.model';
import { Poi } from '../models/poi.model';
import { DwellEntry } from '../models/dwell.model';

@Injectable({ providedIn: 'root' })
export class DwellService {
  computeDwell(positions: Position[], pois: Poi[]): DwellEntry[] {
    const results: DwellEntry[] = [];

    pois.forEach((poi) => {
      const positionsInPoi = positions.filter((pos) => {
        const distance = this.getDistance(
          poi.latitude,
          poi.longitude,
          pos.latitude,
          pos.longitude
        );
        return distance <= (poi.raio ?? 50);
      });

      const totalMs = positionsInPoi.length * 1000;
      if (totalMs > 0) {
        results.push({
          placa: positionsInPoi[0].placa,
          poi: poi,
          totalMs: totalMs,
          totalHuman: this.msToHuman(totalMs),
        });
      }
    });

    return results;
  }

  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(value: number) {
    return (value * Math.PI) / 180;
  }

  private msToHuman(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m}:${s}`;
  }
}
