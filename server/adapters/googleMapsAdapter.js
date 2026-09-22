/**
 * GOOGLE MAPS ADAPTER
 *
 * Calcula a distância e o tempo estimado de carro entre o restaurante
 * (endereço de origem configurado no .env) e o endereço de entrega do
 * cliente, usando a Distance Matrix API do Google Maps.
 *
 * A chave de API fica exclusivamente no servidor — nunca é exposta ao navegador.
 */

const DISTANCE_MATRIX_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';

export class GoogleMapsAdapter {
  constructor(config = {}) {
    this.apiKey = config.apiKey || process.env.GOOGLE_MAPS_API_KEY || '';
    this.originAddress = config.originAddress || process.env.RESTAURANT_ORIGIN_ADDRESS || '';

    this.isConfigured = Boolean(
      this.apiKey &&
      !this.apiKey.includes('placeholder') &&
      this.originAddress &&
      !this.originAddress.includes('placeholder')
    );
  }

  /**
   * Calcula distância (km) e duração estimada de carro até o endereço informado.
   */
  async calculateDistance(destinationAddress) {
    if (!destinationAddress || !destinationAddress.trim()) {
      return { success: false, reason: 'invalid_destination' };
    }

    if (!this.isConfigured) {
      console.log('[GoogleMapsAdapter] Integração não configurada — GOOGLE_MAPS_API_KEY ou RESTAURANT_ORIGIN_ADDRESS ausente no .env');
      return { success: false, reason: 'not_configured' };
    }

    const params = new URLSearchParams({
      origins: this.originAddress,
      destinations: destinationAddress,
      units: 'metric',
      mode: 'driving',
      language: 'pt-BR',
      key: this.apiKey
    });

    try {
      const response = await fetch(`${DISTANCE_MATRIX_URL}?${params.toString()}`);
      const data = await response.json();

      const element = data?.rows?.[0]?.elements?.[0];

      if (data.status !== 'OK' || !element || element.status !== 'OK') {
        const reason = element?.status || data.status || 'unknown_error';
        console.warn(`[GoogleMapsAdapter] Não foi possível calcular distância (${reason}) para: ${destinationAddress}`);
        return { success: false, reason };
      }

      return {
        success: true,
        distanceKm: Math.round((element.distance.value / 1000) * 10) / 10,
        distanceText: element.distance.text,
        durationMin: Math.round(element.duration.value / 60),
        durationText: element.duration.text
      };
    } catch (err) {
      console.error('[GoogleMapsAdapter] Falha na comunicação com a API do Google Maps:', err.message);
      return { success: false, reason: 'network_error' };
    }
  }
}
