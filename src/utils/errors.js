// Erro cuja mensagem pode ser mostrada diretamente ao usuário
// (entrada inválida, "não encontrado", etc.). Qualquer outro erro vira uma mensagem genérica.
export class UserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserError';
  }
}

export class CityNotFoundError extends UserError {
  constructor(city) {
    super(`❌ Não encontrei a cidade **${city}**. Tente outro nome.`);
    this.name = 'CityNotFoundError';
    this.city = city;
  }
}

// Resposta HTTP com status de erro (permite tratar 400/404 de forma específica).
export class HttpError extends Error {
  constructor(status, host) {
    super(`HTTP ${status} em ${host}`);
    this.name = 'HttpError';
    this.status = status;
  }
}
