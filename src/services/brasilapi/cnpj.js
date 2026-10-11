import { TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { formatCnpj } from '../../utils/format.js';
import { brasilApiGet } from './client.js';

// Evita "AVENIDA AVENIDA PAULISTA" caso a API já traga o tipo no logradouro.
function buildStreet(d) {
  const street = d.logradouro ?? '';
  const type = d.descricao_tipo_de_logradouro;
  return type && !street.toUpperCase().startsWith(type.toUpperCase()) ? `${type} ${street}` : street;
}

// cnpj: 14 caracteres já normalizados
export function getCnpj(cnpj) {
  return cached(`cnpj:${cnpj}`, TTL.cnpj, async () => {
    const d = await brasilApiGet(`/cnpj/v1/${cnpj}`, `❌ CNPJ **${formatCnpj(cnpj)}** não encontrado.`);

    return {
      cnpj: d.cnpj ?? cnpj,
      razaoSocial: d.razao_social,
      nomeFantasia: d.nome_fantasia || null,
      situacao: d.descricao_situacao_cadastral,
      abertura: d.data_inicio_atividade,
      atividade: d.cnae_fiscal_descricao,
      naturezaJuridica: d.natureza_juridica,
      porte: d.descricao_porte || (typeof d.porte === 'string' ? d.porte : null),
      capitalSocial: Number(d.capital_social ?? 0),
      endereco: {
        logradouro: buildStreet(d),
        numero: d.numero,
        complemento: d.complemento,
        bairro: d.bairro,
        municipio: d.municipio,
        uf: d.uf,
        cep: d.cep,
      },
    };
  });
}
