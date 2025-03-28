import http from 'k6/http';
import { check, sleep } from 'k6';

export const baseUrl = 'https://api.poledataapp.com/api';
export const emailAdm1 = 'g.gulov+adm1@gmail.com';
export const passwordAdm1 = 'Helloadm1';
export const companyId = '9b45259c-fca2-41da-a67f-400636bc215c';
export const projectId = '9e89f505-15cb-4f9f-b9c6-4bca7a773651';
export const poleID = '9e8a0c12-84df-4ee0-9a69-f6e418d00f67';

export function loginAndGetAuthDetails() {
    const loginPayload = JSON.stringify({
      email: emailAdm1,
      password: passwordAdm1,
      device: 'Unknown',
      remember: true,
      with_cookie: false,
    });

    const loginResponse = http.post(`${baseUrl}/login`, loginPayload, {
      headers: { 'Content-Type': 'application/json' },
    });

    check(loginResponse, {
      'login succeeded': (res) => res.status === 200 && res.json('token')
    });

    const responseBody = loginResponse.json();

    return {
      token: responseBody.token,

    };
};
