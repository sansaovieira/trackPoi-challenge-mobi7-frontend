export interface Position {
  id: number;
  placa: string;
  data: string;       // ISO string vindo do backend
  velocidade: number;
  latitude: number;
  longitude: number;
  ignicao: boolean;
}
