import http from 'k6/http';
import { check, sleep } from 'k6';

export const baseUrl = 'https://api.poledataapp.com/api';
export const emailAdm1 = 'g.gulov+adm1@gmail.com';
export const passwordAdm1 = 'Helloadm1';
export const emailAdm2 = 'g.gulov+adm2@gmail.com';
export const passwordAdm2 = 'Hello111';
export const companyId = '9b45259c-fca2-41da-a67f-400636bc215c';
export const project1Id = '9e928b54-f9c5-49f3-8ae9-872ab599502e';
export const project2Id = '9e8a2e54-a555-41c3-a81d-9f532df8e529';
export const pole1ID = '9e928b96-9af6-4278-8fd3-877eb83efd66';
export const pole2ID = '9e928a45-bd2c-47db-91eb-bcd0964e00d2';

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