import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, emailAdm1, passwordAdm1 } from '../utils/helper.js';

export const options = {
  vus: 10,           // Number of virtual users
  duration: '30s',   // Duration of the test
};

export default function () {
  const url = `${baseUrl}/login`;

  const payload = JSON.stringify({
    email: emailAdm1,
    password: passwordAdm1,
    device: 'Unknown',
    remember: true,
    with_cookie: false,
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

 // Parse JSON response
 const responseBody = res.json();

 // Check if login was successful and token exists
 const isSuccess = check(res, {
   'status is 200': (r) => r.status === 200,
   'token exists': () => responseBody && responseBody.token !== undefined,
 });

 // Log the token to terminal if successful
 if (isSuccess && responseBody.token) {
   console.log('🔑 Token:', responseBody.token);
 } else {
   console.error('❌ Login failed or token not found:', responseBody);
 }

 sleep(1);
}