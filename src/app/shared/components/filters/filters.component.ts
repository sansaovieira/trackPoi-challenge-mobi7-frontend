import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: false,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() plates: string[] = [];
  @Output() search = new EventEmitter<{ placa: string | null; data: string | null }>();

  form = this.fb.group({
    placa: [''],
    data: [''] // input text no formato MM/DD/YYYY (igual ao endpoint)
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    const placa = this.form.value.placa?.trim() || null;
    const data = this.form.value.data?.trim() || null;
    this.search.emit({ placa, data });
  }

  clear() {
    this.form.reset();
    this.search.emit({ placa: null, data: null });
  }
}
