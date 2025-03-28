import http from 'k6/http';
import { check, sleep } from 'k6';

export const baseUrl = 'https://api.poledataapp.com/api';
export const emailAdm1 = 'g.gulov+adm1@gmail.com';
export const passwordAdm1 = 'Helloadm1';
export const emailAdm2 = 'g.gulov+adm2@gmail.com';
export const passwordAdm2 = 'Hello111';
export const companyId = '9b45259c-fca2-41da-a67f-400636bc215c';
export const project1Id = '9e8a5f3f-03e5-45ea-b575-8fe9a218f6ed';
export const project2Id = '9e8a2e54-a555-41c3-a81d-9f532df8e529';
export const pole1ID = '9e8a4650-18f5-4326-a923-5ceab09e3c61';
export const pole2ID = '9e8a6dae-2738-482b-b561-d987c542caf8';

export function loginAndGetAuthDetailsAdm1() {
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

export function loginAndGetAuthDetailsAdm2() {
  const loginPayload = JSON.stringify({
    email: emailAdm2,
    password: passwordAdm2,
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