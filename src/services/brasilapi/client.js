import { API } from '../../config/constants.js';
import { fetchJson } from '../../utils/http.js';
import { HttpError, UserError } from '../../utils/errors.js';

// GET na BrasilAPI. Respostas 400/404 viram um UserError com a mensagem informada.
export async function brasilApiGet(path, notFoundMessage) {
  try {
    return await fetchJson(`${API.brasilapi}${path}`);
  } catch (err) {
    if (err instanceof HttpError && (err.status === 400 || err.status === 404)) {
      throw new UserError(notFoundMessage);
    }
    throw err;
  }
}
