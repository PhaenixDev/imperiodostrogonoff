export interface DistanceResult {
  success: boolean;
  distanceKm?: number;
  distanceText?: string;
  durationMin?: number;
  durationText?: string;
  reason?: string;
}

/**
 * Consulta o backend (Google Maps Distance Matrix) para saber a distância e o
 * tempo estimado de carro entre o restaurante e o endereço informado.
 * Falha graciosamente (success: false) se a API não estiver configurada,
 * o endereço não for encontrado, ou houver erro de rede.
 */
export async function fetchDeliveryDistance(address: string): Promise<DistanceResult> {
  try {
    const response = await fetch(`/api/distance?address=${encodeURIComponent(address)}`);
    return await response.json();
  } catch {
    return { success: false, reason: 'network_error' };
  }
}
