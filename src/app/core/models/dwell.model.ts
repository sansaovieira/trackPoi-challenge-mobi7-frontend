import { Poi } from './poi.model';

export interface DwellEntry {
  placa: string;
  poi: Poi;
  totalMs: number;
  totalHuman: string;
}
