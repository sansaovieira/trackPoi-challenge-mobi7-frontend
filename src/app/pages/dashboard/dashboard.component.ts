import { Component, OnInit, inject } from '@angular/core';
import { PositionService } from 'src/app/core/services/position.service';
import { PoiService } from 'src/app/core/services/poi.service';
import { DwellService } from 'src/app/core/services/dwell.service';
import { Position } from 'src/app/core/models/position.model';
import { Poi } from 'src/app/core/models/poi.model';
import { DwellEntry } from 'src/app/core/models/dwell.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  private positionService = inject(PositionService);
  private poiService = inject(PoiService);
  private dwellService = inject(DwellService);

  filterPlaca: string = '';
  filterData: string = '';
  minDate: string = '1990-01-01';
  maxDate: string = new Date().toISOString().split('T')[0];

  rows: DwellEntry[] = [];
  vehiclePositions: Position[] = [];
  allPositions: Position[] = [];
  pois: Poi[] = [];

  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.loading = true;
    this.error = null;

    forkJoin({
      positions: this.positionService.getPositions(),
      pois: this.poiService.getPois(),
    }).subscribe({
      next: ({ positions, pois }) => {
        this.allPositions = positions ?? [];
        this.vehiclePositions = [...this.allPositions];
        this.pois = pois ?? [];
        this.updateRows();
        this.loading = false;
      },
      error: () => {
        this.error = 'Falha ao carregar dados iniciais.';
        this.loading = false;
      },
    });
  }

  private updateRows() {
    if (!this.pois.length || !this.vehiclePositions.length) {
      this.rows = [];
      return;
    }
    this.rows = this.dwellService.computeDwell(
      this.vehiclePositions,
      this.pois
    );
  }

  onSearch(filter: { placa: string | null; data: string | null }) {
    this.vehiclePositions = this.allPositions.filter((pos) => {
      const placaMatch = filter.placa ? pos.placa.includes(filter.placa) : true;

      let dataMatch = true;
      if (filter.data) {
        const d = new Date(filter.data);
        const dataIso = d.toISOString().slice(0, 10);
        dataMatch = !!(pos.data && pos.data.startsWith(dataIso));
      }

      return placaMatch && dataMatch;
    });
    this.updateRows();
  }

  onClear() {
    this.filterPlaca = '';
    this.filterData = '';
    this.vehiclePositions = [...this.allPositions];
    this.updateRows();
  }
}
