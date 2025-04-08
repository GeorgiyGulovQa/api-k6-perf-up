import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, loginAndGetAuthDetailsAdm2, project1Id, companyId, pole2ID } from '../utils/helper.js';
import { pole2Data } from '../utils/helper_pole2_data.js';

export const options = {
  vus: 10,
  duration: '600s',
};

export default function () {
  const {token} = loginAndGetAuthDetailsAdm2();

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
    { endpoint: `/project/${project1Id}`, expectedStatus: 200},
    { endpoint: `/pole/${pole2ID}`, expectedStatus: 200},
  ];

  // Loop through endpoints and check response codes explicitly
  apiEndpoints.forEach(({ endpoint, expectedStatus }) => {
    const res1 = http.get(`${baseUrl}${endpoint}`, authHeaders);

    check(res1, {
      [`Endpoint ${endpoint} returns status ${expectedStatus}`]: (r) => r.status === expectedStatus,
    });

    console.log(`✅ Requested ${endpoint}: received ${res1.status}`);
    console.log(`Request duration ${endpoint} (total): ${res1.timings.duration} ms`);
    /*console.log(`Request sending: ${res1.timings.sending} ms`);
    console.log(`Waiting for response: ${res1.timings.waiting} ms`);
    console.log(`Response receiving: ${res1.timings.receiving} ms`);
    sleep(1);*/
  });

  const updateRes = http.put(
    `${baseUrl}/pole/${pole2ID}`, 
    JSON.stringify(pole2Data), 
    { headers: authHeaders.headers }
  );

check(updateRes, {
  'Pole updated successfully': (r) => r.status === 200 || r.status === 204,
});
console.log(`Request duration Pole update (total): ${updateRes.timings.duration} ms`);
/*console.log(`Request sending: ${updateRes.timings.sending} ms`);
console.log(`Waiting for response: ${updateRes.timings.waiting} ms`);
console.log(`Response receiving: ${updateRes.timings.receiving} ms`);*/
console.log(`Pole update status: ${updateRes.status}`);
//console.log(`Pole update response: ${updateRes.body}`);

//sleep(1);
};

