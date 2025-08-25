import { Injectable } from '@angular/core';
import { Position } from '../models/position.model';
import { Poi } from '../models/poi.model';
import { DwellEntry } from '../models/dwell.model';

@Injectable({ providedIn: 'root' })
export class DwellService {
  computeDwell(positions: Position[], pois: Poi[]): DwellEntry[] {
    if (!positions?.length || !pois?.length) return [];

    const byPlate = new Map<string, Position[]>();
    for (const p of positions) {
      if (!byPlate.has(p.placa)) byPlate.set(p.placa, []);
      byPlate.get(p.placa)!.push(p);
    }

    for (const [placa, list] of byPlate) {
      list.sort((a, b) => this.toTime(a.data) - this.toTime(b.data));
      byPlate.set(placa, list);
    }

    const totals = new Map<
      string,
      { placa: string; poi: Poi; totalMs: number }
    >();

    for (const [placa, list] of byPlate) {
      if (list.length < 2) continue;

      for (const poi of pois) {
        let sumMs = 0;

        for (let i = 0; i < list.length - 1; i++) {
          const cur = list[i];
          const nxt = list[i + 1];

          const curInside = this.isInsidePoi(cur.latitude, cur.longitude, poi);
          const nxtInside = this.isInsidePoi(nxt.latitude, nxt.longitude, poi);

          if (curInside && nxtInside) {
            const dt = this.toTime(nxt.data) - this.toTime(cur.data);
            if (dt > 0) sumMs += dt;
          }
        }

        if (sumMs > 0) {
          const key = `${placa}::${poi.id ?? poi.nome}`;
          totals.set(key, { placa, poi, totalMs: sumMs });
        }
      }
    }

    const results: DwellEntry[] = [];
    for (const { placa, poi, totalMs } of totals.values()) {
      results.push({
        placa,
        poi,
        totalMs,
        totalHuman: this.msToHuman(totalMs),
      });
    }

    return results.sort(
      (a, b) =>
        a.placa.localeCompare(b.placa) || a.poi.nome.localeCompare(b.poi.nome)
    );
  }

  private isInsidePoi(lat: number, lon: number, poi: Poi): boolean {
    const distance = this.getDistance(poi.latitude, poi.longitude, lat, lon);
    return distance <= (poi.raio ?? 50);
  }

  private toTime(isoOrDateLike: string): number {
    const t = Date.parse(isoOrDateLike);
    return isNaN(t) ? 0 : t;
  }

  private getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // metros
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
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }
}
