import { TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { formatCep } from '../../utils/format.js';
import { brasilApiGet } from './client.js';

// cep: 8 dígitos já normalizados
export function getCep(cep) {
  return cached(`cep:${cep}`, TTL.cep, async () => {
    const d = await brasilApiGet(`/cep/v2/${cep}`, `❌ CEP **${formatCep(cep)}** não encontrado.`);
    const coords = d.location?.coordinates ?? {};

    return {
      cep: d.cep ?? cep,
      street: d.street,
      neighborhood: d.neighborhood,
      city: d.city,
      state: d.state,
      service: d.service,
      latitude: coords.latitude ?? null,
      longitude: coords.longitude ?? null,
    };
  });
}
