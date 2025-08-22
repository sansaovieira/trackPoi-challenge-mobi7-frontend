// Haversine + check se ponto está dentro do raio
const toRad = (v: number) => (v * Math.PI) / 180;

export function haversineMeters(
  lat1: number, lon1: number, lat2: number, lon2: number
): number {
  const R = 6371000; // metros
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function isInsidePoi(
  lat: number, lon: number, poiLat: number, poiLon: number, radiusMeters: number
): boolean {
  return haversineMeters(lat, lon, poiLat, poiLon) <= radiusMeters;
}
