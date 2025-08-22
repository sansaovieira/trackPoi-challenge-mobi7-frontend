import { Component, Input } from '@angular/core';
import { DwellEntry } from 'src/app/core/models/dwell.model';
import { Poi } from 'src/app/core/models/poi.model';

@Component({
  selector: 'app-dwell-table',
  templateUrl: './dwell-table.component.html',
  styleUrls: ['./dwell-table.component.scss'],
})
export class DwellTableComponent {
  @Input() rows: DwellEntry[] = [];

  exportCsv() {
    if (!this.rows?.length) return;

    const csvContent = [
      ['Placa', 'POI', 'Tempo Total', 'Tempo (ms)'],
      ...this.rows.map((r) => [r.placa, r.poi.nome, r.totalHuman, r.totalMs]),
    ]
      .map((e) => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dwell_times.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  onSeePoi(poi: Poi) {
    if (poi.latitude && poi.longitude) {
      const url = `https://www.google.com/maps?q=${poi.latitude},${poi.longitude}`;
      window.open(url, '_blank');
    }
  }
}
