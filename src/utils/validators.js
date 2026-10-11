import { UserError } from './errors.js';

export function normalizeCep(input) {
  const digits = input.replace(/\D/g, '');
  if (digits.length !== 8) {
    throw new UserError('❌ CEP inválido. Informe 8 dígitos, por exemplo `01001-000`.');
  }
  return digits;
}

// Aceita CNPJ numérico e o novo formato alfanumérico (12 caracteres + 2 dígitos verificadores).
// Cada caractere vale (código ASCII - 48), o que mantém o cálculo antigo para dígitos.
export function normalizeCnpj(input) {
  const cnpj = input.replace(/[^0-9A-Za-z]/g, '').toUpperCase();

  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(cnpj) || /^(.)\1+$/.test(cnpj) || !hasValidCnpjCheckDigits(cnpj)) {
    throw new UserError('❌ CNPJ inválido. Confira os 14 caracteres e tente novamente.');
  }
  return cnpj;
}

function hasValidCnpjCheckDigits(cnpj) {
  const values = [...cnpj].map((ch) => ch.charCodeAt(0) - 48);

  const checkDigit = (length) => {
    const weights = length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + values[i] * w, 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return checkDigit(12) === values[12] && checkDigit(13) === values[13];
}

// Código FIPE: 6 dígitos + dígito verificador, ex: 001004-9
export function normalizeFipeCode(input) {
  const clean = input.replace(/[^0-9A-Za-z]/g, '');
  if (!/^\d{7}$/.test(clean)) {
    throw new UserError('❌ Código FIPE inválido. Use o formato `001004-9`.');
  }
  return `${clean.slice(0, 6)}-${clean.slice(6)}`;
}
