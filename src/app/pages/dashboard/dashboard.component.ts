import { Component, OnInit, inject } from '@angular/core';
import { DwellEntry } from 'src/app/core/models/dwell.model';
import { Poi } from 'src/app/core/models/poi.model';
import { Position } from 'src/app/core/models/position.model';
import { DwellService } from 'src/app/core/services/dwell.service';
import { PoiService } from 'src/app/core/services/poi.service';
import { PositionService } from 'src/app/core/services/position.service';

@Component({
 selector: 'app-dashboard-page',
  templateUrl: './dashboard.component.html', // ajuste no próximo passo
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  private positionService = inject(PositionService);
  private poiService = inject(PoiService);
  private dwellService = inject(DwellService);

  plates: string[] = [];
  pois: Poi[] = [];

  loading = false;
  error: string | null = null;

  rows: DwellEntry[] = [];

  ngOnInit(): void {
    this.loadInitial();
  }

  private loadInitial() {
    this.loading = true;
    this.error = null;

    // Carrega placas e POIs em paralelo
    this.positionService.getPlates().subscribe({
      next: (plates) => this.plates = plates ?? [],
      error: () => this.error = 'Falha ao carregar placas.'
    });

    this.poiService.getPois().subscribe({
      next: (pois) => this.pois = pois ?? [],
      error: () => this.error = 'Falha ao carregar POIs.',
      complete: () => this.loading = false
    });
  }

  onSearch(filter: { placa: string | null; data: string | null }) {
    this.loading = true;
    this.error = null;
    this.rows = [];

    this.positionService.getPositions(filter.placa, filter.data).subscribe({
      next: (positions: Position[]) => {
        if (!positions?.length) {
          this.rows = [];
          return;
        }
        this.rows = this.dwellService.computeDwell(positions, this.pois);
      },
      error: () => this.error = 'Falha ao buscar posições.',
      complete: () => this.loading = false
    });
  }
}
