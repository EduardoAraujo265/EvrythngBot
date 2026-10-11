export const brl = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const signedPercent = (pct) =>
  pct >= 0 ? `📈 +${pct.toFixed(2)}%` : `📉 ${pct.toFixed(2)}%`;

// Campos de embed não aceitam texto vazio.
export const orDash = (value) =>
  value === null || value === undefined || value === '' ? '—' : String(value);

export const truncate = (text, max) =>
  text.length > max ? `${text.slice(0, max - 1)}…` : text;

export const formatCep = (cep) =>
  String(cep).padStart(8, '0').replace(/^(\d{5})(\d{3})$/, '$1-$2');

export const formatCnpj = (cnpj) =>
  String(cnpj).replace(/^(\w{2})(\w{3})(\w{3})(\w{4})(\w{2})$/, '$1.$2.$3/$4-$5');

// 'YYYY-MM-DD' -> 'DD/MM/YYYY'
export const formatDateBR = (iso) => (iso ? String(iso).slice(0, 10).split('-').reverse().join('/') : '—');
