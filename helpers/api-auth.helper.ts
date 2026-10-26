import { APIRequestContext, expect } from '@playwright/test';
import { CONDUIT_DATA } from '../data/conduit-data';

export class ApiAuthHelper {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  /**
   * S'assure que l'utilisateur existe (sinon le crée), puis retourne son jeton JWT.
   */
  async getAuthToken(): Promise<string> {
    // 1. Tenter l'inscription (POST /users) avec un identifiant dynamique pour garantir son existence
    const registerResponse = await this.request.post(`${CONDUIT_DATA.apiUrl}/users`, {
      data: {
        user: {
          username: CONDUIT_DATA.user.username,
          email: CONDUIT_DATA.user.email,
          password: CONDUIT_DATA.user.password,
        },
      },
    });

    // Si le compte est nouvellement créé (201) ou existe déjà (422), on passe au login
    if (registerResponse.status() === 201) {
      const body = await registerResponse.json();
      return body.user.token;
    }

    // 2. Connexion (POST /users/login)
    const loginResponse = await this.request.post(`${CONDUIT_DATA.apiUrl}/users/login`, {
      data: {
        user: {
          email: CONDUIT_DATA.user.email,
          password: CONDUIT_DATA.user.password,
        },
      },
    });

    // Assertion : S'assurer que la connexion renvoie bien 200 OK
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();
    return loginBody.user.token;
  }
}
