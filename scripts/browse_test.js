import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, emailAdm1, passwordAdm1 } from '../utils/helper.js';


export const options = {
  vus: 5,
  duration: '10s',
};

function loginAndGetAuthDetails() {
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
    'login succeeded': (res) => res.status === 200 && res.json('token'),
 //   'company ID exists': (res) => res.json('user?.roles?.[0]?.company?.id') !== undefined,
  });

  const responseBody = loginResponse.json();
  return {
    token: responseBody.token,
    companyId: responseBody.user?.roles?.[0]?.company?.id,
  };
  
}

export default function () {
  const { token, companyId } = loginAndGetAuthDetails();


  const authHeaders = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-company': companyId
    },
  };
console.log(companyId);
  // Define API endpoints and expected response codes
  const apiEndpoints = [
    { endpoint: '/dashboard', expectedStatus: 200 },
    { endpoint: '/profile', expectedStatus: 200 },
    { endpoint: '/notification', expectedStatus: 200 },
    { endpoint: '/project?page=1&per_page=-1', expectedStatus: 200 }
  ];

  // Loop through endpoints and check response codes explicitly
  apiEndpoints.forEach(({ endpoint, expectedStatus }) => {
    const res = http.get(`${baseUrl}${endpoint}`, authHeaders);

    check(res, {
      [`Endpoint ${endpoint} returns status ${expectedStatus}`]: (r) => r.status === expectedStatus,
    });

    console.log(`✅ Requested ${endpoint}: received ${res.status}`);

    sleep(1);
  });
}
