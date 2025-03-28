import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseUrl, loginAndGetAuthDetailsAdm1, companyId, project1Id } from '../utils/helper.js';

export const options = {
  vus: 1,           // ✅ Single VU
  iterations: 1000, // Give it room
};

export default function () {
  const { token } = loginAndGetAuthDetailsAdm1();

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'x-company': companyId,
  };

  let successCount = 0;

  while (successCount < 100) {
    const createRes = http.post(
      `${baseUrl}/pole`,
      JSON.stringify({
        project_id: project1Id,
        name: 'pole-for-update',
        lat: 39.9,
        lng: -98.7,
        circumference: 'initial',
        guy_anchors: [],
      }),
      { headers }
    );

    if (createRes.status !== 201) {
      console.warn(`❌ Create failed: ${createRes.status}`);
      continue;
    }

    const poleId = createRes.json('id');

    const updateRes = http.put(
      `${baseUrl}/pole/${poleId}`,
      JSON.stringify({
        name: 'updated-pole',
        lat: 40,
        lng: -99,
        circumference: 'updated',
        guy_anchors: [],
      }),
      { headers }
    );

    const success = check(updateRes, {
      'PUT success': (r) => r.status === 200 || r.status === 204,
    });

    if (success) {
      successCount++;
      console.log(`✅ Update #${successCount} succeeded`);
    } else {
      console.warn(`⚠️ Update failed: ${updateRes.status}`);
    }

    sleep(0.2);
  }

  console.log('🎯 Exactly 100 successful updates complete. Test exiting.');
}
