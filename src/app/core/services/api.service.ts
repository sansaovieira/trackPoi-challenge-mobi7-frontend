import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';
import { Poi } from '../models/poi.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  listPlates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/posicao/placas`);
  }

  listPositions(
    placa?: string | null,
    data?: string | null
  ): Observable<Position[]> {
    let params = new HttpParams();
    if (placa) params = params.set('placa', placa);
    if (data) params = params.set('data', data);
    return this.http.get<Position[]>(`${this.base}/posicao/`, { params });
  }

  listPois(): Observable<Poi[]> {
    return this.http.get<Poi[]>(`${this.base}/pois`);
  }

  getPoiByName(name: string): Observable<Poi> {
    return this.http.get<Poi>(`${this.base}/pois/${encodeURIComponent(name)}`);
  }
}
