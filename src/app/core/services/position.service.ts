import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Position } from '../models/position.model';

@Injectable({ providedIn: 'root' })
export class PositionService {
  private api = inject(ApiService);

  getPositions(placa?: string | null, data?: string | null): Observable<Position[]> {
    return this.api.listPositions(placa, data);
  }

  getPlates(): Observable<string[]> {
    return this.api.listPlates();
  }
}
