import { Injectable } from '@angular/core';
import { Position } from '../models/position.model';
import { Poi } from '../models/poi.model';
import { DwellEntry } from '../models/dwell.model';
import { isInsidePoi } from '../utils/geo.utils';
import { msToHHMMSS } from '../utils/time.utils';

/**
 * Regras de negócio:
 * - Ordena posições por data asc
 * - Para cada POI, percorre posições do veículo e soma os intervalos onde a posição está "inside"
 * - Intervalo = diferença entre timestamps consecutivos enquanto permanecer dentro
 * - No último ponto "inside", não extrapola além do último sample
 * - Ignora velocidade/ignição para o cálculo de "tempo dentro da região" (escopo pedido)
 */
@Injectable({ providedIn: 'root' })
export class DwellService {

  computeDwell(positions: Position[], pois: Poi[]): DwellEntry[] {
    if (!positions?.length || !pois?.length) return [];

    // group por placa
    const byPlate = new Map<string, Position[]>();
    positions.forEach(p => {
      if (!byPlate.has(p.placa)) byPlate.set(p.placa, []);
      byPlate.get(p.placa)!.push(p);
    });

    const results: DwellEntry[] = [];

    for (const [placa, arr] of byPlate.entries()) {
      // ordenado por data
      const sorted = [...arr].sort((a, b) => (new Date(a.data).getTime() - new Date(b.data).getTime()));

      for (const poi of pois) {
        let totalMs = 0;
        let prev: Position | null = null;
        let prevInside = false;

        for (const cur of sorted) {
          const inside = isInsidePoi(cur.latitude, cur.longitude, poi.latitude, poi.longitude, poi.raio);

          if (prev) {
            // se dois pontos consecutivos estão inside -> soma delta
            if (prevInside && inside) {
              const delta = new Date(cur.data).getTime() - new Date(prev.data).getTime();
              if (delta > 0) totalMs += delta;
            }
          }

          prev = cur;
          prevInside = inside;
        }

        if (totalMs > 0) {
          results.push({
            placa,
            poi: poi.nome,
            totalMs,
            totalHuman: msToHHMMSS(totalMs),
          });
        }
      }
    }

    // ordena por maior tempo
    return results.sort((a, b) => b.totalMs - a.totalMs);
  }
}
