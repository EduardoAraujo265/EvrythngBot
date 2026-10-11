import { TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { UserError } from '../../utils/errors.js';
import { brasilApiGet } from './client.js';

// code: código FIPE normalizado (ex: 001004-9)
export function getFipePrice(code) {
  return cached(`fipe:${code}`, TTL.fipe, async () => {
    const notFound = `❌ Código FIPE **${code}** não encontrado.`;
    const list = await brasilApiGet(`/fipe/preco/v1/${code}`, notFound);

    if (!Array.isArray(list) || list.length === 0) throw new UserError(notFound);

    const first = list[0];
    return {
      codigoFipe: first.codigoFipe ?? code,
      marca: first.marca,
      modelo: first.modelo,
      mesReferencia: (first.mesReferencia ?? '').trim(),
      // um preço por ano/modelo; o mais novo primeiro
      precos: list
        .map((p) => ({ ano: p.anoModelo, combustivel: p.combustivel, valor: p.valor }))
        .sort((a, b) => b.ano - a.ano),
    };
  });
}
