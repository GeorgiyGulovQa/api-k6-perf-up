import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, loginAndGetAuthDetailsAdm1, pole1ID, pole2ID, companyId } from '../utils/helper.js';

export default function () {
    const {token} = loginAndGetAuthDetailsAdm1();
  console.log(token);
    const authHeaders = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-company': companyId,
      },
    };
     const res1 = http.del(`${baseUrl}/pole/${pole1ID}`, null, authHeaders);

     check(res1, {
        'delete succeeded': (r) => r.status === 204,
      });
    
      console.log(`Response status: ${res1.status}`);
      console.log(`Response body: ${res1.body}`);
    
      sleep(1);
      
      const res2 = http.del(`${baseUrl}/pole/${pole2ID}`, null, authHeaders);

      check(res2, {
         'delete succeeded': (r) => r.status === 204,
       });
     
       console.log(`Response status: ${res2.status}`);
       console.log(`Response body: ${res2.body}`);
     
       sleep(1);
    }