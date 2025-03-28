import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, loginAndGetAuthDetails, projectId, companyId } from '../utils/helper.js';


export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const {token} = loginAndGetAuthDetails();

  const authHeaders = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'x-company': companyId,
    },
  };
console.log(companyId);
  // Define API endpoints and expected response codes
  const apiEndpoints = [
    { endpoint: '/dashboard', expectedStatus: 200 },
    { endpoint: '/profile', expectedStatus: 200 },
    { endpoint: '/notification', expectedStatus: 200 },
    { endpoint: '/project?page=1&per_page=-1', expectedStatus: 200 },
    { endpoint: `/project/${projectId}`, expectedStatus: 200}
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
