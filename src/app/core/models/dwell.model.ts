export interface DwellEntry {
  placa: string;
  poi: string;
  totalMs: number;       // total em milissegundos
  totalHuman: string;    // "HH:mm:ss"
}

export interface DwellRequest {
  placa?: string | null;
  // data no formato "MM/DD/YYYY" (igual ao backend)
  data?: string | null;
}
