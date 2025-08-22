import { Component, Input } from '@angular/core';
import { DwellEntry } from 'src/app/core/models/dwell.model';


@Component({
  selector: 'app-dwell-table',
  standalone: false,
  templateUrl: './dwell-table.component.html',
  styleUrls: ['./dwell-table.component.scss']
})
export class DwellTableComponent {
  @Input() rows: DwellEntry[] = [];

  exportCsv() {
    const header = ['placa', 'poi', 'totalMs', 'totalHuman'];
    const lines = [header.join(',')].concat(
      this.rows.map(r => [r.placa, r.poi, r.totalMs, r.totalHuman].join(','))
    );
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dwell-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
