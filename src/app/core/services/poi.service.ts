import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Poi } from '../models/poi.model';

@Injectable({ providedIn: 'root' })
export class PoiService {
  private api = inject(ApiService);

  getPois(): Observable<Poi[]> {
    return this.api.listPois();
  }

  getPoiByName(name: string): Observable<Poi> {
    return this.api.getPoiByName(name);
  }
}
