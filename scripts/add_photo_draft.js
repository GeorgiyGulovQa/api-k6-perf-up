import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, loginAndGetAuthDetails, companyId, poleID } from '../utils/helper.js';
import { data } from '../utils/helper_data.js';

const imgData = open('../files/16Mb.jpeg', 'b');

/*export const options = {
  vus: 1,
  duration: '10s',
};*/

export default function () {
  const { token } = loginAndGetAuthDetails();

  const headers = {
    Authorization: `Bearer ${token}`,
    'x-company': companyId,
    accept: 'application/json',
  };

  const files = {
    file: http.file(imgData, '16Mb.jpeg', 'image/jpeg'),
  };

  const res = http.post(`${baseUrl}/pole/${poleID}/photo`, { ...data, ...files }, { headers });

  check(res, {
    'upload succeeded': (r) => r.status === 201,
  });

  console.log(`Response status: ${res.status}`);
  //console.log(`Response body: ${res.body}`);

  sleep(1);
}
